/*import { ModuleWithProviders } from '@angular/Core';
import { Routes, RouterModule } from '@angular/router';

import { MarketComponent } from './component/market.component';
import { BagComponent } from './component/bag.component';
import { AdminComponent } from './component/admin.component';
import { ProductFormComponent } from './component/product-form.component';
import { ProductDetailComponent } from './component/product-detail.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/market',
		pathMatch: 'full'
	},
	{
		path: 'market',
		component: MarketComponent
	},
	{
		path: 'market/detail/:id',
		component: ProductDetailComponent
	},
	{
		path: 'bag',
		component: BagComponent
	},
	{
		path: 'admin',
		component: AdminComponent
	},
	{
		path: 'admin/new-product',
		component: ProductFormComponent
	},
	{
		path: 'admin/modify-product/:id',
		component: ProductFormComponent
	}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);*/
import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

const appRoutes: Routes = [

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);