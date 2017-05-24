import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CetoDataService } from './ceto-data.service';
import { QueryDataService } from './query-data.service';
import { MedusaDataService } from './medusa-data.service'
import { SegmentDataService } from './segment-data.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
  ],
  providers: [
    CetoDataService,
    QueryDataService,
    MedusaDataService,
    SegmentDataService,
   ],
  exports: [
  ]
})
export class CetoDataModule { }
