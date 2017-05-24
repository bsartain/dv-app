import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Routes, Router, RouterModule, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Query__Query } from "../../../services/ceto-data/ceto-data.service";
import { CetoDataService } from "../../../services/ceto-data/ceto-data.service";
import { QueryDataService } from '../../../services/ceto-data/query-data.service';
import { ToasterContainerComponent, ToasterService } from 'angular2-toaster';

declare var jQuery:any;

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.template.html'
})
export class TopnavbarComponent implements OnInit{

    private query: Query__Query;
    private queryId: any;
    private querySliced: any;
    private queryInfo = [];

    constructor(
        private router: Router, 
        private _route: ActivatedRoute,
        private _cetoDataService: CetoDataService,
        private _queryDataService: QueryDataService,
        private _router: Router,
        private toasterService: ToasterService,
    ){
        this.router = _router;
    }

    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
        smoothlyMenu();
    }

    // backToDash(){        
    //     let queryId = this._router.url;
    //     let querySliced = queryId.slice(11)
    //     this._cetoDataService.query.Get_Is_Modified(querySliced).subscribe(
    //         (data) => {
    //             if(data[0]['modified'] == 1){
    //                 jQuery('#backToDashModal').modal('show');
    //             } else {
    //                 this._router.navigate(['/dashboard']);
    //             }
    //         }
    //     )
    // }

    // backToDashSave(){
        
    //     this._cetoDataService.query.Put_Name(this.queryInfo[0]['id_Query_ID'], this.queryInfo[0]['txt_Query_Name']).subscribe(
    //     data => {
    //       this._cetoDataService.query.Put_Save(this.queryInfo[0]['id_Query_ID']).subscribe(
    //         (data) => {
    //             this.toasterService.pop('success', 'Your query was saved'); 
    //             this._router.navigate(['/dashboard']);
    //         },
    //         (err) => this.toasterService.pop('error', 'Your query failed to save'),
    //       )
    //     },
    //     (err) => this.toasterService.pop('error', 'Your query failed to save name'),
    //   )
      

    // }

    // backToDashDiscard(){
    //     console.log('BACK TO DASH DISCARD');
    //     this._cetoDataService.query.Put_Edit_Cancel(this.queryInfo[0]['id_Query_ID']).subscribe(
    //         (data) => {
    //             this.toasterService.pop('success', 'Your changes are discarded')
    //             this._router.navigate(['/dashboard']);
    //         },
    //         (err) => this.toasterService.pop('error', 'Your query failed to Discard'),
    //     )

    // }

    ngOnInit(){
        
    }

}
