import { Component, Input, Host, forwardRef, Inject } from '@angular/core';

import { Product } from '../model/product';
import { Bag } from '../model/bag';
import { ProductService } from '../service/product.service';
import { BagService } from '../service/bag.service';
import { AppComponent } from '../app.component';

@Component({
	selector: 'button-buy',
	template: `<button class="btn btn-success pull-right" 
	(click)="add2Bag()">
	<span class="glyphicon glyphicon-plus"></span> Add</button>`
})

export class AddButtonComponent {
	bag: Array<Bag> = [];
	count: number = 0;
	@Input ('productSend') product: Product;

	constructor(
		private productService: ProductService,
		private bagService: BagService,
		@Inject(forwardRef(() => AppComponent)) private c: AppComponent
	) {
		this.bag = c.bagElements;
		this.count = c.count;
	}

	add2Bag() {
		let existP = [];
		if(this.bag) {
			existP = this.bag.filter(p => this.product.id === p.id_product);
		}

	    this.bagService
	    	.addProduct(this.product, existP)
	    	.then((p) => {
	    		if(existP.length === 0){
	    			this.bag.push(p);
	    		}
	    		this.count = this.count + 1;
	    		this.c.updateValue(1);
	    	});
	}
}