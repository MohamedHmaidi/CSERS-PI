
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//myrouting
import { EquipegetallComponent } from "./views/admin/Equipe/getallequipe.component";
import { CreateEquipeComponent } from "./views/admin/Equipe/createequipe.component";
import {UpdateEquipeComponent} from "./views/admin/Equipe/updateequipe.component";
import { MembregetallComponent } from "./views/admin/Membre/getallmembre.component";
import {UpdateMembreComponent} from "./views/admin/Membre/updatemembre.component";

import { StatTeamComponent } from "./views/stat-team/stat-team.component";


//mohamed
import {IncidentListComponent} from "./views//incident-list/incident-list.component"
import { UpdateIncidentComponent } from "./views//update-incident/update-incident.component";
import { AddIncidentComponent } from './views/add-incident/add-incident.component';
import { TypeIncidentListComponent } from "./views//type-incident-list/type-incident-list.component";
import { AddIncidentTypeComponent } from "./views//add-incident-type/add-incident-type.component";
import { ChatComponent } from "./views//chat/chat.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";


//aymen
import { ClaimsFrontComponent } from "./views/front/claims-front/claims-front.component";
import { ClaimCreateComponent } from "./views/front/claim-create/claim-create.component";
import { ClaimInfoComponent } from "./views/front/claim-info/claim-info.component";
import { ClaimUpdateComponent } from "./views/front/claim-update/claim-update.component";
import { ClaimsBackComponent } from "./views/back/claims-back/claims-back.component";
import { ClaimInfoBackComponent } from "./views/back/claim-info-back/claim-info-back.component";
import { ClaimCreateBackComponent } from "./views/back/claim-create-back/claim-create-back.component";
import { ClaimUpdateBackComponent } from "./views/back/claim-update-back/claim-update-back.component";
import { ClaimStatsBackComponent } from "./views/back/claim-stats-back/claim-stats-back.component";

//mahmoud
import { QuizzesComponent } from "./views/quizzes/quizzes.component"; 
import { QuizDetailComponent } from "./views/quiz-detail/quiz-detail.component"; 
import { AddQuizComponent } from "./views/add-quiz/add-quiz.component";
import { TrainingContentListComponent } from './views/training-content-list/training-content-list.component';
import { AvailableQuizzesComponent } from './views/available-quizzes/available-quizzes.component';
import { PassQuizComponent } from './views/pass-quiz/pass-quiz.component';
import { AddTrainingContentComponent } from './views/add-training-content/add-training-content.component';
import { QuizStatisticsComponent } from './views/quiz-statistics/quiz-statistics.component';

//achref
import { AllUserComponent } from "./views/all-user/all-user.component";
import { RoleGuardService } from "./views/role/role-guard.service";
import { EditUserComponent } from "./views/edit-user/edit-user.component";
import { ForgetPasswordComponent } from "./views/forget-password/forget-password.component";
import { LoginComponent } from "./views/login/login.component";
import { RegisterComponent } from "./views/register/register.component";
import { NewPasswordComponent } from './views/new-password/new-password.component';
import { UserStatComponent } from './views/user-stat/user-stat.component';
import { VerifyOtpComponent } from './views/verify-otp/verify-otp.component';

//istabrak
import { RessourceComponent } from "./views/ressource/ressource.component";
import { AddRessourceComponent } from './views/add-ressource/add-ressource.component';
import { ReservationComponent } from "./views/Reservation/reservation.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views

import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";



// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

const routes: Routes = [

  {path: 'chatRoom',component: ChatComponent},
  {path: 'incidents', component: IncidentListComponent} ,
  {path: 'TypeIncidents', component: TypeIncidentListComponent} ,
  {path: 'add-incident', component: AddIncidentComponent} ,
  {path: 'update-incident/:id', component:  UpdateIncidentComponent} ,
  {path: 'addType', component:   AddIncidentTypeComponent},
  { path: "claims/claims-front", component: ClaimsFrontComponent },
  { path: "claims/claim-create", component: ClaimCreateComponent },
  { path: "claims/claim-info/:id", component: ClaimInfoComponent },
  { path: "claims/claim-update/:id", component: ClaimUpdateComponent },
  { path: 'quizzes', component: QuizzesComponent },
  { path: 'quizzes/statistics', component: QuizStatisticsComponent },
  { path: 'quizzes/:id', component: QuizDetailComponent },
  { path: 'addquiz', component: AddQuizComponent },
  { path: 'training-content', component: TrainingContentListComponent },
  { path: 'addtrainingcontent', component: AddTrainingContentComponent },
  { path: 'available-quizzes', component: AvailableQuizzesComponent },
  { path: 'available-quizzes/:id', component: PassQuizComponent },
  {path:"stats", component:DashboardComponent},
{path :"statTeam",component:StatTeamComponent}  ,
  //{ path: "listequipe", component: EquipegetallComponent },
     // { path: "addequipe", component: CreateEquipeComponent },
     // { path: "updateequipe/:id", component: UpdateEquipeComponent },
     // { path: "updatemembre/:id", component: UpdateMembreComponent },
      //{ path: "addmembre", component: CreateMembreComponent },
     // { path: "listemembre", component: MembregetallComponent },
     { path: "ressource", component: RessourceComponent },
  {path: 'add-ressource', component: AddRessourceComponent} ,
  //{path: 'app-reservation', component: ReservationComponent} ,
      { path: "maps", component: IncidentListComponent },
      { path: "admin/claims/claims-back", component: ClaimsBackComponent },
      { path: "admin/claims/claim-info/:id", component: ClaimInfoBackComponent },
      { path: "admin/claims/claim-create", component: ClaimCreateBackComponent },
      { path: "admin/claims/claim-update/:id", component: ClaimUpdateBackComponent },
      { path: "admin/claims/claims-stats", component: ClaimStatsBackComponent },
      { path: "admin/claims/claims-stats", component: ClaimStatsBackComponent },
      { path: "reservation", component: ReservationComponent},
      { path: "alluser", component: AllUserComponent },
      { path: "edit-user/:id", component: EditUserComponent },



  // admin views
  {
    path: 'admin', component: AdminComponent ,
    children: [
      { path: "alluser", component: AllUserComponent },
      { path: 'edit-user/:userId', component: EditUserComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
  //  { path: "maps", component: MapsComponent },
  { path: "addequipe", component: CreateEquipeComponent },
  { path: "updateequipe/:id", component: UpdateEquipeComponent },
  { path: "updatemembre/:id", component: UpdateMembreComponent },
  //{ path: "addmembre", component: CreateMembreComponent },
  { path: "listemembre", component: MembregetallComponent },
  { path: "listequipe", component: EquipegetallComponent },
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
      { path: "forget-password", component: ForgetPasswordComponent },
      { path: "verifyotp", component: VerifyOtpComponent },
      { path: "new-password", component: NewPasswordComponent },
      { path: "*", redirectTo: "", pathMatch: "full" },
    ],
  },
  // no layout views
  { path: "profile/:idMembre", component: ProfileComponent },
  { path: "", component: RegisterComponent },
  { path: "landing", component: AddIncidentComponent },
  { path: "index", component: IndexComponent },
  { path: "*", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
