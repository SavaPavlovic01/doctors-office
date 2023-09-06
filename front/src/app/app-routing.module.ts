import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { PatientAllDoctorsComponent } from './patient-all-doctors/patient-all-doctors.component';
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

const routes: Routes = [
  {path:'',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'registerDoctor',component:RegisterDoctorComponent},
  {path:'userProfile',component:UserProfileComponent},
  {path:'doctorProfile',component:DoctorProfileComponent},
  {path:'patitentAllDoctors',component:PatientAllDoctorsComponent},
  {path:'patientDoctorProfile',component:PatientDoctorProfileComponent},
  {path:'patientFormApp',component:PatientFormAppComponent},
  {path:'patientCalanderApp',component:PatientCalanderAppComponent},
  {path:'patientAppointments',component:PatientAppointmentsComponent},
  {path:'patientNotificatins',component:PatientNotificationsComponent},
  {path:'doctorAppointments',component:DoctorAppointmentsComponent},
  {path:'doctorOther',component:DoctorOtherComponent},
  {path:'doctorMedicalHistory',component:DoctorMedicalHistoryComponent},
  {path:'adminLogin',component:AdminLoginComponent},
  {path:'adminAllUsers',component:AdminAllUsersComponent},
  {path:'adminUserProfile',component:AdminUserProfileComponent},
  {path:'adminDoctorProfile',component:AdminDoctorProfileComponent},
  {path:'adminAppRequests',component:AdminAppRequestsComponent},
  {path:'adminAllTypes',component:AdminAllTypesComponent},
  {path:'adminAddType',component:AdminAddTypeComponent},
  {path:'adminAddSpec',component:AdminAddSpecComponent},
  {path:'adminRegisterRequest',component:AdminRegisterRequestComponent},
  {path:'adminNotification',component:AdminNotificationComponent},
  {path:'userChangePassword',component:UserChangePasswordComponent},
  {path:'doctorChangePassword',component:DoctorChangePasswordComponent},
  {path:'adminChangePassword',component:AdminChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
