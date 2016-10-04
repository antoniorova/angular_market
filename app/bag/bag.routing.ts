import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { BagComponent } from './bag.component';
import { BagListComponent } from './bag-list.component';

const bagRoutes: Routes = [
  {
    path: '',
    redirectTo: '/bag',
    pathMatch: 'full'
  },
  {
    path: 'bag',
    component: BagComponent,
    children: [
      {
        path: '',
        component: BagListComponent
      }
    ]
  }
];

export const bagRouting: ModuleWithProviders = RouterModule.forChild(bagRoutes);
