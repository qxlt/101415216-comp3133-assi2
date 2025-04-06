import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api/apiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = ""
  password: string = ""

  constructor(private apiService: ApiService, private router: Router){}

  onSubmit(): any {
    this.apiService.login(this.username, this.password).subscribe((response: any) => {
      const token = response?.data?.login?.token;
      if (token) {
        localStorage.setItem('authToken', token);
        console.log("login successfully")
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Login failed: No token received');
      }
    }, (error: Error) => {
      console.error('Login error:', error);
    });
  }
  

}
