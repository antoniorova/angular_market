import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
	selector: 'admin',
	templateUrl: 'app/templates/product-detail.component.html'
})

export class ProductDetailComponent implements OnInit{
	product: Product;
	products: Product;

	constructor(
		private productService: ProductService,
		private route: ActivatedRoute
		) {}

	ngOnInit(): void {

		let id = +this.route.snapshot.params['id'];
		this.productService.getProduct(id).then((r) => {
			console.log(r);
			this.product = r[0];
			this.products = r;
			 console.log(this.products);
		});
	}

	goBack(): void{
		window.history.back();
		event.preventDefault();
	}

	loadImages(p): void {
    	for(let i=0; i<p["length"];i++){
			var blob = new Blob([p[i].data], {type: `${p[i].type}`});
			var file = new File([blob], p[i].image_name);
			Object.defineProperty(file, 'type', { value: p[i].type});
			// this.product.imagesfile);
			/*var object = {
				"dataURL": p[i].data,
				"url": p[i].name,
				"file": file
			};*/

		}
    }
}
