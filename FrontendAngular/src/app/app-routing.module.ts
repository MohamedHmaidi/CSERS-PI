
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//myrouting
import { EquipegetallComponent } from "./views/admin/Equipe/getallequipe.component";
import { CreateEquipeComponent } from "./views/admin/Equipe/createequipe.component";
import {UpdateEquipeComponent} from "./views/admin/Equipe/updateequipe.component";
import { CreateMembreComponent } from "./views/admin/Membre/createmembre.component";
import { MembregetallComponent } from "./views/admin/Membre/getallmembre.component";
import {UpdateMembreComponent} from "./views/admin/Membre/updatemembre.component";


//mohamed
import {IncidentListComponent} from "./views//incident-list/incident-list.component"
import { UpdateIncidentComponent } from "./views//update-incident/update-incident.component";
import { AddIncidentComponent } from './views/add-incident/add-incident.component';
import { TypeIncidentListComponent } from "./views//type-incident-list/type-incident-list.component";
import { AddIncidentTypeComponent } from "./views//add-incident-type/add-incident-type.component";
import { ChatComponent } from "./views//chat/chat.component";

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



  // admin views
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "settings", component: SettingsComponent },
      { path: "tables", component: TablesComponent },
  //  { path: "maps", component: MapsComponent },
      { path: "listequipe", component: EquipegetallComponent },
      { path: "addequipe", component: CreateEquipeComponent },
      { path: "updateequipe/:id", component: UpdateEquipeComponent },
      { path: "updatemembre/:id", component: UpdateMembreComponent },
      { path: "addmembre", component: CreateMembreComponent },
      { path: "listemembre", component: MembregetallComponent },
      { path: "maps", component: IncidentListComponent },
      { path: "claims/claims-back", component: ClaimsBackComponent },
      { path: "claims/claim-info/:id", component: ClaimInfoBackComponent },
      { path: "claims/claim-create", component: ClaimCreateBackComponent },
      { path: "claims/claim-update/:id", component: ClaimUpdateBackComponent },
      { path: "claims/claims-stats", component: ClaimStatsBackComponent },
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },
  // auth views
  {
    path: "auth",
    component: AuthComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "", component: RegisterComponent },
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
