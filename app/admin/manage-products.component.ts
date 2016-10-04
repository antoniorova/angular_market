import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
	selector: 'admin',
	templateUrl: 'app/templates/manage-products.component.html'
})

export class ManageProductsComponent implements OnInit{
	products: Product[];
	productSelected: Product;
	isSelected: boolean;

	constructor(
		private productService: ProductService,
		private router: Router
		) {}

	ngOnInit(): void {
		this.isSelected = false;
		this.productService.getProducts().then((r) => {
			this.products = r;
		});
	}

	onSelected(product: Product): void {
		this.productSelected = product;
		this.isSelected = true;
	}

	deleteProduct(product: Product): void {
		this.productService
			.deleteProduct(product.id)
			.then(() => {
				this.products = this.products.filter(p => p !== product);
				if(this.productSelected === product) {this.productSelected = null;}
			});
			
	}

	goTo(option: number): void{
		if(option>0) {
			this.router.navigate(['/admin/modify-product/' + option]);
		} else {
			this.router.navigate(['/admin/new-product']);
		}
		
	}
}
