import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { DoctorDisplayComponent } from './doctor-display/doctor-display.component';
import { PatientAllDoctorsComponent } from './patient-all-doctors/patient-all-doctors.component';
import { DoctorDisplayPatientComponent } from './doctor-display-patient/doctor-display-patient.component';
import { PatientDoctorProfileComponent } from './patient-doctor-profile/patient-doctor-profile.component';
import { PatientFormAppComponent } from './patient-form-app/patient-form-app.component';
import { PatientCalanderAppComponent } from './patient-calander-app/patient-calander-app.component';
import { PatientAppointmentsComponent } from './patient-appointments/patient-appointments.component';
import { PatientNotificationsComponent } from './patient-notifications/patient-notifications.component';
import { DoctorAppointmentsComponent } from './doctor-appointments/doctor-appointments.component';
import { DoctorOtherComponent } from './doctor-other/doctor-other.component';
import { DoctorMedicalHistoryComponent } from './doctor-medical-history/doctor-medical-history.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAllUsersComponent } from './admin-all-users/admin-all-users.component';
import { AdminUserProfileComponent } from './admin-user-profile/admin-user-profile.component';
import { AdminDoctorProfileComponent } from './admin-doctor-profile/admin-doctor-profile.component';
import { AdminAppRequestsComponent } from './admin-app-requests/admin-app-requests.component';
import { AdminAllTypesComponent } from './admin-all-types/admin-all-types.component';
import { AdminAddTypeComponent } from './admin-add-type/admin-add-type.component';
import { AdminAddSpecComponent } from './admin-add-spec/admin-add-spec.component';
import { AdminRegisterRequestComponent } from './admin-register-request/admin-register-request.component';
import { AdminNotificationComponent } from './admin-notification/admin-notification.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { DoctorChangePasswordComponent } from './doctor-change-password/doctor-change-password.component';
import { AdminChangePasswordComponent } from './admin-change-password/admin-change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    RegisterComponent,
    RegisterDoctorComponent,
    UserProfileComponent,
    DoctorProfileComponent,
    DoctorDisplayComponent,
    PatientAllDoctorsComponent,
    DoctorDisplayPatientComponent,
    PatientDoctorProfileComponent,
    PatientFormAppComponent,
    PatientCalanderAppComponent,
    PatientAppointmentsComponent,
    PatientNotificationsComponent,
    DoctorAppointmentsComponent,
    DoctorOtherComponent,
    DoctorMedicalHistoryComponent,
    AdminLoginComponent,
    AdminAllUsersComponent,
    AdminUserProfileComponent,
    AdminDoctorProfileComponent,
    AdminAppRequestsComponent,
    AdminAllTypesComponent,
    AdminAddTypeComponent,
    AdminAddSpecComponent,
    AdminRegisterRequestComponent,
    AdminNotificationComponent,
    UserChangePasswordComponent,
    DoctorChangePasswordComponent,
    AdminChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
