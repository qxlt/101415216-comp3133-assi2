import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEmpComponent } from './create-emp/create-emp.component';
import { DetailComponent } from './detail/detail.component';
import { AuthGuard } from './middleware/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'enrollEmployee', component: CreateEmpComponent, canActivate: [AuthGuard]},
    { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard]},
    { path: '', component: SignupComponent} 
];
