import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { NavigationComponent } from "./navigation.component";
// import { DimensionsComponent } from "../../../dimensions/dimensions.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DndModule } from 'ng2-dnd';

@NgModule({
    declarations: [NavigationComponent],
    imports     : [BrowserModule, RouterModule, NgbModule, DndModule.forRoot()],
    exports     : [NavigationComponent],
})

export class NavigationModule {}