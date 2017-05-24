import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from "@angular/router";
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { DndModule } from 'ng2-dnd';
import { QuerypageheaderComponent } from './querypageheader/querypageheader.component';
import { FilterPipe } from './filters/filter.pipe';
import { FilterArrayPipe } from './filters/filter-array.pipe';
import { QueryDataOldService} from './services/query-data-old.service';
//import { CetoService } from './services/ceto.service';
import { ResultTableComponent } from './result-table/result-table.component';
import { AlertsComponent } from './alerts/alerts.component';
import { FilterWidgetComponent } from './filter-widget/filter-widget.component';

import { DashboardService } from './dashboard/dashboard.service';
import { QueryDataResolve } from './querydata/querydata.resolve';
import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App views
import { MainViewModule } from "./views/main-view/main-view.module";
import { MinorViewModule } from "./views/minor-view/minor-view.module";
import { LoginModule } from "./views/login/login.module";
import { RegisterModule } from "./views/register/register.module";

// App modules/components
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardPipe } from './dashboard/dashboard.pipe';
import { SharedqueryPipe } from './dashboard/sharedquery.pipe';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DataTableModule } from "angular2-datatable";
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { QuerydataComponent } from './querydata/querydata.component';
import { DropZoneWidgetGroupbyComponent } from './drop-zone-widget-groupby/drop-zone-widget-groupby.component';
import { DropZoneWidgetComponent } from './drop-zone-widget/drop-zone-widget.component';
import { DropZoneWidgetMeasureComponent } from './drop-zone-widget-measure/drop-zone-widget-measure.component';
import { DzfiltersComponent } from './dzfilter/dzfilters.component';
import { DimensionsComponent } from './dimensions/dimensions.component';

import { CetoDataModule } from './services/ceto-data/ceto-data.module'
import { UserService } from './services/user.service';

// Was not successfully adding routes to module
//import { QueryPageModule } from './query-page/query-page.module'
// import { QueryPageComponent } from './query-page/query-page.component'
// import { QueryPageResolve } from './query-page/query-page.resolve'
import { QueryPageService } from './query-page/query-page.service';
import { DropZoneWidgetFilterComponent } from './drop-zone-widget-filter/drop-zone-widget-filter.component';
import { FilterEditComponent } from './filter-edit/filter-edit.component';
import { KnowledgebaseComponent } from './knowledgebase/knowledgebase.component';
import { KnowledgebasePipe } from './filters/knowledgebase.pipe';
//import { QueryPageHeaderComponent } from './query-page-header/query-page-header.component'
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { FilterWidgetCategoryComponent } from './filter-widget-category/filter-widget-category.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardPipe,
    SharedqueryPipe,
    QuerydataComponent,
    DropZoneWidgetGroupbyComponent,
    DropZoneWidgetComponent,
    DropZoneWidgetMeasureComponent,
    DimensionsComponent,
    DzfiltersComponent,
    QuerypageheaderComponent,
    FilterPipe,
    FilterArrayPipe,
    ResultTableComponent,
    AlertsComponent,
    FilterWidgetComponent,
    DropZoneWidgetFilterComponent,
    FilterEditComponent,
    KnowledgebaseComponent,
    KnowledgebasePipe,
    FilterWidgetCategoryComponent,
    //QueryPageHeaderComponent,
    //QueryPageComponent,
  ],
  imports: [
    // Angular modules
    RouterModule.forRoot(ROUTES),

    BrowserModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    DataTableModule,
    NgbModule.forRoot(),
    DndModule.forRoot(),

    // Views
    MainViewModule,
    MinorViewModule,
    LoginModule,
    RegisterModule,

    // Modules
    LayoutsModule,
    CetoDataModule,
    //QueryPageModule,

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, 
    QueryDataResolve,
    //QueryPageResolve,
    QueryDataOldService,
    DashboardService,
    //CetoService,
    UserService,
    QueryPageService,
    //CetoDataService,
    CookieService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
