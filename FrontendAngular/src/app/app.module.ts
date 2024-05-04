import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxYoutubePlayerModule } from 'ngx-youtube-player';


import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms"; 
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireModule } from "@angular/fire";
import { MessagingService } from "../core/service/messaging.service";
import { environment } from "../environments/environment";
import { AsyncPipe } from "../../node_modules/@angular/common";
import { initializeApp } from "firebase/app";
initializeApp(environment.firebase);


// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";


//myviews
import {EquipegetallComponent} from "./views/admin/Equipe/getallequipe.component";
import {CreateEquipeComponent} from "./views/admin/Equipe/createequipe.component";
import {UpdateEquipeComponent} from "./views/admin/Equipe/updateequipe.component";
import {CreateMembreComponent} from "./views/admin/Membre/createmembre.component";
import {MembregetallComponent} from "./views/admin/Membre/getallmembre.component";
import {UpdateMembreComponent} from "./views/admin/Membre/updatemembre.component";


//mohamed
import { IncidentListComponent } from './views/incident-list/incident-list.component';
import { UpdateIncidentComponent } from './views/update-incident/update-incident.component';
import { AddIncidentComponent } from './views/add-incident/add-incident.component';
import { TypeIncidentListComponent } from './views/type-incident-list/type-incident-list.component';
import { AddIncidentTypeComponent } from './views/add-incident-type/add-incident-type.component';
import {ChatComponent} from "./views/chat/chat.component";
import { MapComponent } from './views/map/map.component';
import { IncidentDetailComponent } from './views/incident-detail/incident-detail.component';


//aymen
import { ClaimsFrontComponent } from './views/front/claims-front/claims-front.component';
import { ClaimsBackComponent } from './views/back/claims-back/claims-back.component';
import { ClaimCreateComponent } from './views/front/claim-create/claim-create.component';
import { ClaimInfoComponent } from './views/front/claim-info/claim-info.component';
import { ClaimUpdateComponent } from './views/front/claim-update/claim-update.component';
import { ResponsePerClaimComponent } from './views/front/response-per-claim/response-per-claim.component';
import { ResponseCreateComponent } from './views/front/response-create/response-create.component';
import { ClaimInfoBackComponent } from './views/back/claim-info-back/claim-info-back.component';
import { ClaimCreateBackComponent } from './views/back/claim-create-back/claim-create-back.component';
import { ClaimUpdateBackComponent } from './views/back/claim-update-back/claim-update-back.component';
import { ClaimStatsBackComponent } from './views/back/claim-stats-back/claim-stats-back.component';

//mahmoud
import { QuizzesComponent } from "./views/quizzes/quizzes.component"; 
import { QuizDetailComponent } from "./views/quiz-detail/quiz-detail.component"; 
import { AddQuizComponent } from "./views/add-quiz/add-quiz.component";
import { TrainingContentListComponent } from './views/training-content-list/training-content-list.component';
import { AvailableQuizzesComponent } from './views/available-quizzes/available-quizzes.component';
import { PassQuizComponent } from './views/pass-quiz/pass-quiz.component';
import { AddTrainingContentComponent } from './views/add-training-content/add-training-content.component';
import { QuizStatisticsComponent } from './views/quiz-statistics/quiz-statistics.component';


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

// components for views and layouts
import { ReactiveFormsModule } from '@angular/forms';
import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    EquipegetallComponent,
    CreateEquipeComponent,
    CreateMembreComponent,
    MembregetallComponent,
    UpdateEquipeComponent,
    UpdateMembreComponent,
    IncidentListComponent,
    UpdateIncidentComponent,
    AddIncidentComponent,
    TypeIncidentListComponent,
    AddIncidentTypeComponent,
    ChatComponent,
    MapComponent,
    IncidentDetailComponent,
    ClaimsFrontComponent,
    ClaimsBackComponent,
    ClaimCreateComponent,
    ClaimInfoComponent,
    ClaimUpdateComponent,
    ResponsePerClaimComponent,
    ResponseCreateComponent,
    ClaimInfoBackComponent,
    ClaimCreateBackComponent,
    ClaimUpdateBackComponent,
    ClaimStatsBackComponent,
    QuizzesComponent,
    QuizDetailComponent,
    AddQuizComponent,
    TrainingContentListComponent,
    AvailableQuizzesComponent,
    PassQuizComponent,
    AddTrainingContentComponent,
    QuizStatisticsComponent,




  ],
  imports: [
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    BrowserModule,
   MatSnackBarModule,
   MatPaginatorModule,
   MatSliderModule,
   MatDialogModule,
   NgxYoutubePlayerModule,

  ],
  providers: [MessagingService,AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}