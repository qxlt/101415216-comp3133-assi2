import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import {toSignal} from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, Validators, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {map} from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api/apiService';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { Router } from '@angular/router';



@Component({
  selector: 'app-create-emp',
  standalone: true,
  imports: [RouterModule, SidebarComponent, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './create-emp.component.html',
  styleUrl: './create-emp.component.css'
})
export class CreateEmpComponent implements OnInit {
  formData!: FormGroup;
  profileLink: any = "";

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (event: any) => {
        this.profileLink = event.target.result;
      };
    }
  }
  

  ngOnInit() {
    this.formData = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      date_of_joining: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      salaryLevel: new FormControl('', [Validators.required]),
      other: new FormControl(''),
    });
  
  }

  constructor(private apiService: ApiService, private router: Router){}

  onSubmit() {
    if (this.formData.valid) {

      const dateObj = new Date(this.formData.value.date_of_joining);
      const formattedDate = dateObj.toISOString().split('T')[0];

      this.apiService.addNewEmp(
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
      ).subscribe({
        next: (res: any) => { 
          if (res.data.addNewEmp) {
            console.log("New Employee Has Been Added");
            this.router.navigate(['/dashboard']).catch(err => {
              console.error("Navigation error:", err);
            });
          } else {
            console.error("API Error:", res.data?.addNewEmp);
          }
        },
        error: (err: Error) => {
          console.error("API Request failed:", err);
        }
      });
    }
  }


  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);


  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map(v => v || 'auto')),
    {initialValue: 'auto'},
  );

}
