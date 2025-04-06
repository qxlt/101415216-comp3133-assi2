import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api/apiService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, SidebarComponent, MatButtonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
  })

  export class DashboardComponent implements OnInit {
    employees: any[] = [];
    filteredEmployees: any[] = [];
    searched: Boolean = false;
    
    searchString: string = "";
  
    constructor(private apiService : ApiService, private router: Router) {}
  
    ngOnInit(): void {
      console.log("ngAfterViewInit has been triggered");
      this.fetchEmployees();
    }

    fetchEmployees(): void {
      this.apiService.getAllEmp().subscribe({
        next: (response: any) => {
          if (response?.data?.getAllEmp) {
            this.employees = response.data.getAllEmp.map((emp: any) => ({
              ...emp,
              date_of_joining: new Date(Number(emp.date_of_joining))
            }));
          } else {
            console.error("Invalid response format:", response);
          }
        },
        error: (error: Error) => {
          console.error("Error fetching employees:", error);
        }
      });
    }
  
    search(): void {
      this.searched = true
      this.apiService.getEmpByDept(this.searchString).subscribe((res: any)=>{
      this.employees = res.data.getEmpByDept
     })
    }


    clearSearch(): void {
      this.searchString = ""
      this.searched = false
      this.fetchEmployees()
    }


    logout(): void{
      localStorage.clear()
      alert("Logging out")
      this.router.navigate(['/login'])
    }




  }
