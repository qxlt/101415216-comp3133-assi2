import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../api/apiService';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, MatTableModule, SidebarComponent, MatButtonModule, MatIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
  })

  export class DashboardComponent implements AfterViewInit {
    employees: any[] = [];
    filteredEmployees: any[] = [];
    
    searchedEmployee: string = "";
  
    constructor(private apiService : ApiService, private router: Router) {}
  
    ngAfterViewInit(): void {
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
    
    updateSearchedEmp(event: Event): void {
      this.searchedEmployee = (event.target as HTMLInputElement).value;
    }
  
    emptySearchKey(): void {
      this.searchedEmployee = "";
      this.filteredEmployees = [...this.employees]; // Reset filter when search is cleared
    }
  
    search(): void {
      if (!this.searchedEmployee.trim()) { 
        this.filteredEmployees = [...this.employees]; 
        return;
      }
  
      this.filteredEmployees = this.employees.filter(emp =>
        emp.title.toLowerCase().includes(this.searchedEmployee.toLowerCase())
      );
    }

    logout(): void{
      localStorage.clear()
      alert("Logging out")
      this.router.navigate(['/login'])
    }
  }
