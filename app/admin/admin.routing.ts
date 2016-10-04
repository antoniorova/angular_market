import { ModuleWithProviders } from '@angular/Core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageProductsComponent } from './manage-products.component';
import { ProductFormComponent } from './product-form.component';

const adminRoutes: Routes = [
	{
		path: 'admin',
		component: AdminComponent,
		children: [
			{
				path: '',
				component: ManageProductsComponent
			},
			{
				path: 'new-product',
				component: ProductFormComponent
			},
			{
				path: 'modify-product/:id',
				component: ProductFormComponent
			}
		]
	}
];

export const adminRouting: ModuleWithProviders = RouterModule.forChild(adminRoutes);