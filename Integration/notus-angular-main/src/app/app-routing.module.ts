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
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { ClaimsFrontComponent } from "./views/Claims/front/claims-front/claims-front.component";
import { ClaimCreateComponent } from "./views/Claims/front/claim-create/claim-create.component";
import { ClaimInfoComponent } from "./views/Claims/front/claim-info/claim-info.component";
import { ClaimUpdateComponent } from "./views/Claims/front/claim-update/claim-update.component";
import { ClaimsBackComponent } from "./views/Claims/back/claims-back/claims-back.component";
import { ClaimInfoBackComponent } from "./views/Claims/back/claim-info-back/claim-info-back.component";
import { ClaimCreateBackComponent } from "./views/Claims/back/claim-create-back/claim-create-back.component";
import { ClaimUpdateBackComponent } from "./views/Claims/back/claim-update-back/claim-update-back.component";
import { ClaimStatsBackComponent } from "./views/Claims/back/claim-stats-back/claim-stats-back.component";

const routes: Routes = [
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: MapsComponent },
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
      { path: "", redirectTo: "login", pathMatch: "full" },
    ],
  },
  //Claims & Responses
  { path: "claims/claims-front", component: ClaimsFrontComponent },
  { path: "claims/claim-create", component: ClaimCreateComponent },
  { path: "claims/claim-info/:id", component: ClaimInfoComponent },
  { path: "claims/claim-update/:id", component: ClaimUpdateComponent },
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "claims/claims-back", component: ClaimsBackComponent },
      { path: "claims/claim-info/:id", component: ClaimInfoBackComponent },
      { path: "claims/claim-create", component: ClaimCreateBackComponent },
      { path: "claims/claim-update/:id", component: ClaimUpdateBackComponent },
      { path: "claims/claims-stats", component: ClaimStatsBackComponent },
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
