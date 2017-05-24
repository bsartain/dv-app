import { Component, Provider, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { DimensionsComponent } from "../../../dimensions/dimensions.component";

declare var jQuery:any;

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.template.html',
})

export class NavigationComponent {
    constructor(private router: Router, private _activeRoute: ActivatedRoute) {
    }

    

    OnInit(){
        // this._activeRoute.params.subscribe((params: Params) => {
        //     console.log("This is a test: =>" + params);
        // })
    }

    ngAfterViewInit() {
        jQuery('#side-menu').metisMenu();
    }

    activeRoute(routename: string): boolean{
        //console.log(this.router);
        return this.router.url.indexOf(routename) > -1;
        
    }


}