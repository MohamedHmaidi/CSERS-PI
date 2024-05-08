import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AllUserComponent } from "./all-user/all-user.component";
import { RoleGuardService } from "./role/role-guard.service";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { NewPasswordComponent } from "./new-password/new-password.component";

const routes: Routes = [
  // admin views
  {
    path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], data: { roles: ['ADMIN'] },
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
      { path: "alluser", component: AllUserComponent },
      { path: 'edit-user/:userId', component: EditUserComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
      { path: "verifyotp", component: VerifyOtpComponent },
      { path: "new-password", component: NewPasswordComponent },
    ],
  },
  // no layout views
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
