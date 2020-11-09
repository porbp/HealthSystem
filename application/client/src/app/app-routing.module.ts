import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { LabComponent } from './lab/lab.component';

import { AuthVerify } from './Auth/auth.verify';

 
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UserManagementComponent, canActivate: [AuthVerify] },
  { path: 'doctor', component: DoctorComponent, canActivate: [AuthVerify] },
  { path: 'patient', component: PatientComponent, canActivate: [AuthVerify] },
  { path: 'lab', component: LabComponent, canActivate: [AuthVerify] },



  //default
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
