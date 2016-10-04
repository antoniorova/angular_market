import { Component, OnInit, Host } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product';
// import { Bag } from '../model/bag';
import { ProductService } from '../service/product.service';
// import { BagService } from '../service/bag.service';

@Component({
	selector: 'market',
	templateUrl: 'app/templates/product-list.component.html'
})

export class ProductListComponent implements OnInit{
	products: Product[];
	// bag: Bag[];
	constructor(
		private productService: ProductService,
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.productService.getProducts().then((r) => this.products = r);

		// this.bagService.getBag().then((r) => this.bag = r);
	}

	/*add2Bag(product: Product) {
		let existP = this.bag.filter(p => product.id === p.id_product);
	    this.bagService
	    	.addProduct(product, existP)
	    	.then((p) => {
	    		if(existP.length === 0){
	    			this.bag.push(p);
	    		}
	    		console.log(this.bag);
	    	});
	}*/

	goTo(option: number): void{
		this.router.navigate(['/market/detail/' + option]);	
	}
}