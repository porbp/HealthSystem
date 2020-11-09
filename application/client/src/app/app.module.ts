import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,MatMenuModule,MatProgressBarModule, MatStepperModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table'  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { HttpClientModule } from '@angular/common/http';

import { ApiService, AuthService, UserService } from './services/index';
import { AuthVerify } from './Auth/auth.verify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { EmrListComponent } from './content/emr-list/emr-list.component';
import { EmrCreateComponent } from './content/emr-create/emr-create.component';
import { LabComponent } from './lab/lab.component';
import { EmrUpdateComponent } from './content/emr-update/emr-update.component';
import { RuleComponent } from './rule/rule.component'
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { PredictComponent } from './predict/predict.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserManagementComponent,
    DoctorComponent,
    PatientComponent,
    EmrListComponent,
    EmrCreateComponent,
    LabComponent,
    EmrUpdateComponent,
    RuleComponent,
    PredictComponent
  ],
  imports: [
  MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [ ApiService,
    AuthService,
    UserService,
    AuthVerify],
  bootstrap: [AppComponent]
})
export class AppModule { }
