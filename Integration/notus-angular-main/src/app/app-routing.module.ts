import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./dashboard/dashboard.component";
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

import {IncidentListComponent} from "./incident-list/incident-list.component"
import { UpdateIncidentComponent } from "./update-incident/update-incident.component";
import { AddIncidentComponent } from "./add-incident/add-incident.component";
import { TypeIncidentListComponent } from "./type-incident-list/type-incident-list.component";
import { AddIncidentTypeComponent } from "./add-incident-type/add-incident-type.component";
import { ChatComponent } from "./chat/chat.component";
const routes: Routes = [
  {path: 'chatRoom',component: ChatComponent},
  {path: 'incidents', component: IncidentListComponent} ,
  {path: 'TypeIncidents', component: TypeIncidentListComponent} ,
  {path: 'add-incident', component: AddIncidentComponent} ,
  {path: 'update-incident/:id', component:  UpdateIncidentComponent} ,
  {path: 'addType', component:   AddIncidentTypeComponent},
  
  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
      { path: "maps", component: IncidentListComponent },
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
