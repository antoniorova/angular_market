import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { MarketComponent }     from './market.component';
import { ProductListComponent }       from './product-list.component';
import { ProductDetailComponent }     from './product-detail.component';
import { AddButtonComponent } from './add-button.component';

import { DefaultImageDirective } from '../directive/default-image.directive';

import { PipeModule } from '../pipes/pipe.module';
import { marketRouting } from './market.routing';

@NgModule({
  imports: [
    CommonModule,
    marketRouting,
    PipeModule
  ],
  declarations: [
    MarketComponent,
    ProductListComponent,
    ProductDetailComponent,
    AddButtonComponent,
    DefaultImageDirective
  ]
})
export class MarketModule {}
