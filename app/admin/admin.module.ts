import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { ImageUploadModule } from '../../mod_modules/ng2-imageupload/index';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';

import { AdminComponent } from './admin.component';
import { ManageProductsComponent } from './manage-products.component';
import { ProductFormComponent } from './product-form.component';

import { BytesPipe } from '../pipes/bytes.pipe';

import { adminRouting } from './admin.routing';

@NgModule({
	imports: [

  CommonModule,
		FormsModule,
		ReactiveFormsModule,
		ImageUploadModule,
		DragulaModule,
		adminRouting
	],
	declarations: [
		AdminComponent,
		ManageProductsComponent,
		ProductFormComponent,
		BytesPipe
	]
})

export class AdminModule {}