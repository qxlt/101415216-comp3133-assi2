import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/apiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {
  formData!: FormGroup;
  profileLink: any = "";
  editing: boolean = false;
  empId:string = ""

  editButtonStyle: string = "bg-green-300 text-blue-950 hover:bg-green-200"

  constructor(private activatedRoute : ActivatedRoute, private apiService: ApiService, private router:Router){}

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.profileLink = event.target.result;
      };
    }
  }

  toggleEditMode(): void {
    this.editing = !this.editing;
  
    this.editButtonStyle = this.editing
      ? "bg-blue-950 text-green-200"
      : "bg-green-300 text-blue-950 hover:bg-green-200";

      if (this.editing) {
        this.formData.enable();  
      } else {
        this.formData.disable();
      }
  }

  getSalaryRangeLabel(salary: number): string {
    if (salary < 40000) return "Under $40,000/yr";
    if (salary < 50000) return "$40,000-$49,999";
    if (salary < 60000) return "$50,000-$59,999";
    if (salary < 70000) return "$60,000-$69,999";
    if (salary < 80000) return "$70,000-$79,999";
    if (salary < 90000) return "$80,000-$89,999";
    return "Above $90,000/yr";
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      firstName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastName: new FormControl({ value: '', disabled: true }, [Validators.required]),
      department: new FormControl({ value: '', disabled: true }, [Validators.required]),
      gender: new FormControl({ value: '', disabled: true }, [Validators.required]),
      date_of_joining: new FormControl({ value: '', disabled: true }, [Validators.required]),
      designation: new FormControl({ value: '', disabled: true }, [Validators.required]),
      salaryLevel: new FormControl({ value: '', disabled: true }, [Validators.required]),
      other: new FormControl({ value: '', disabled: true }),
    });


    this.empId = this.activatedRoute.snapshot.params['id']
    this.apiService.getEmpById(this.empId).subscribe((res: any)=>{
      const employee = res.data.getEmpById
      const joiningDate = new Date(+employee.date_of_joining);

      this.formData.patchValue({
        firstName: employee.first_name,
        lastName: employee.last_name,
        email: employee.email,
        department: employee.department,
        gender: employee.gender,
        date_of_joining: joiningDate,
        designation: employee.designation,
        other: employee.other,
      });
      const salaryLabel = this.getSalaryRangeLabel(employee.salary);
      this.formData.controls['salaryLevel'].setValue(salaryLabel);

      this.profileLink = employee.employee_photo;
    })
  }


  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);

  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map(v => v || 'auto')),
    {initialValue: 'auto'},
  );

  onSubmit(): void {
    const dateObj = new Date(this.formData.value.date_of_joining);
    const formattedDate = dateObj.toISOString().split('T')[0];

    this.apiService.updateEmpById(
      this.empId,  
      this.formData.value.firstName, 
      this.formData.value.lastName, 
      this.formData.value.email, 
      this.formData.value.designation,
      this.formData.value.gender,
      Number(this.formData.value.salaryLevel),
      formattedDate,
      this.formData.value.department,
      this.formData.value.other,
      String(this.profileLink)
    ).subscribe((res: any) => {
      alert("Employee Information Updated")
      this.editing = false
    
      if (res?.data?.updateEmpById) {
        console.log('✅ Employee updated successfully');
      } else {
        console.warn('❌ Update failed:', res);
      }
    }, (err: Error) => {
      console.error('❌ GraphQL error:', err);
    });
    
  }

  deleteEmpById(): any {
    this.apiService.deleteEmp(this.empId).subscribe((data: any)=>{
      console.log("Employee Deleted Successfully")
      this.router.navigate(['/dashboard'])
      alert("Employee Deleted Successfully")
    })
  }




  
}
