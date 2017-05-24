import { Component, OnInit, Input } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { CetoService } from '../services/ceto.service';
import { QueryDataOldService } from '../services/query-data-old.service';
import { CetoDataService, Segment__Header, Medusa__Measure, Segment__Object_Type } from '../services/ceto-data/ceto-data.service';
import { QueryPageService } from "../query-page/query-page.service"

declare var jQuery: any;

@Component({
  selector: 'app-dimensions',
  templateUrl: './dimensions.component.html',
  styleUrls: ['./dimensions.component.css']//,
  //providers: [CetoService]
})

export class DimensionsComponent implements OnInit {
  
  constructor(
    private _qpSvc: QueryPageService,
  ) { }

  ngOnInit() {
    //Toggles plus minus class in dimensions
    jQuery(document).on('click', '.objType-nav-header', function(){	
      let active = jQuery('.card-header.active');
      let notActive = jQuery('.card-header:not(".active")');
      if( active ){        
          active.find('.objType-fa').removeClass('fa-plus').addClass('fa-minus');        
      }      
      if( notActive.find('.fa-minus') ){          
          notActive.find('.objType-fa').removeClass('fa-minus').addClass('fa-plus');        
      }
    })
  }

  //On dimesion click pull back header value by passing dimesion id to services.
  onDimensionClick($event, otid) {
    //jQuery($event.target).find('i').toggleClass('fa-plus fa-minus')
   }   
}

