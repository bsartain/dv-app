import {NgModule, OnInit} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {TopnavbarComponent} from "./topnavbar.component";
import { RouterModule } from "@angular/router";
import { ROUTES } from "../../../app.routes";

@NgModule({
    declarations: [TopnavbarComponent],
    imports     : [BrowserModule, RouterModule.forRoot(ROUTES)],
    exports     : [TopnavbarComponent],
})

export class TopnavbarModule{

    
}