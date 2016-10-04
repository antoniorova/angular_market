import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { MarketComponent } from './market.component';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';

const marketRoutes: Routes = [
  {
    path: '',
    redirectTo: '/market',
    pathMatch: 'full'
  },
  {
    path: 'market',
    component: MarketComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
      },
      {
        path: 'detail/:id',
        component: ProductDetailComponent
      }
    ]
  }
];

export const marketRouting: ModuleWithProviders = RouterModule.forChild(marketRoutes);
