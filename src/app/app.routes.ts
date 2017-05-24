import {Routes} from "@angular/router";
import {mainViewComponent} from "./views/main-view/main-view.component";
import {minorViewComponent} from "./views/minor-view/minor-view.component";
import {loginComponent} from "./views/login/login.component";
import {registerComponent} from "./views/register/register.component";
import {blankComponent} from "./components/common/layouts/blank.component";
import {basicComponent} from "./components/common/layouts/basic.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuerydataComponent } from './querydata/querydata.component';
import { QueryDataResolve } from './querydata/querydata.resolve';
import { TopnavbarComponent } from "./components/common/topnavbar/topnavbar.component";
import { KnowledgebaseComponent } from './knowledgebase/knowledgebase.component';
//import { QueryPageComponent } from "./query-page/query-page.component";
//import { QueryPageResolve } from "./query-page/query-page.resolve";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

  // App views
  {
    path: '', component: basicComponent,
    children: [
      {path: 'mainView', component: mainViewComponent},
      {path: 'minorView', component: minorViewComponent},
      {path: 'knowledgebase', component: KnowledgebaseComponent },
      {path: 'dashboard', component: DashboardComponent },
      //{path: 'querydata', component: QuerydataComponent }
      {
        path: 'querydata/:id_Query_ID', 
        component: QuerydataComponent,
        resolve: {
          query: QueryDataResolve
        }

      // {
      //   path: 'querydata/:id_Query_ID', 
      //   component: QueryPageComponent,
      //   resolve: {
      //     query: QueryPageResolve
      //   }
    },
    ]
  },
  {
    path: '', component: blankComponent,
    children: [
      { path: 'login', component: loginComponent },
      { path: 'register', component: registerComponent }
    ]
  },

  // Handle all other routes
  {path: '**',    component: mainViewComponent }
];
