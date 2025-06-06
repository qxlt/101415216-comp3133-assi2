import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiService } from '../api/apiService';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true, 
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent{
  username: string = ""
  email: string = ""
  password: string = ""
  confirmedPassword : string = ""
  passwordMismatch: boolean = false;

  constructor(private apiService : ApiService, private router: Router) {
    
  }

  validatePassword(): boolean{
    return this.password === this.confirmedPassword
  }

  onSubmit() {
    if(this.validatePassword()){
      this.apiService.signUp(this.username, this.password, this.email).subscribe((res: any)=>{
        if(res.data.signup.username === this.username){
          console.log("Sign up successfully: ", res.data.signup.id)
          this.router.navigate(['/login']);
        }else{
          alert("Sign-Up Failed")
        }
      })
    }
  }
}
