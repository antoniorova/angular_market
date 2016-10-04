import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { BagComponent }     from './bag.component';
import { BagListComponent }     from './bag-list.component';

import { bagRouting } from './bag.routing';
import { PipeModule } from '../pipes/pipe.module';
@NgModule({
  imports: [
  	CommonModule,
    bagRouting,
    PipeModule
  ],
  declarations: [
    BagComponent,
    BagListComponent
  ]
})
export class BagModule {}
