import { Component, OnInit, forwardRef, Inject } from '@angular/core';

import { Bag } from '../model/bag';
import { BagService } from '../service/bag.service';

import { AppComponent } from '../app.component';

@Component({
	selector: 'bag',
	templateUrl: 'app/templates/bag-list.component.html'
})

export class BagListComponent implements OnInit {

	products: Bag[];
	total: number = 0;
	count: number = 0;

	constructor(
		private bagService: BagService,
		@Inject(forwardRef(() => AppComponent)) private c: AppComponent
	) {};

	ngOnInit(): void {
		this.bagService.getBag().then((b) => this.products = this.calculate(b));
		this.count = this.c.count;
	}

	buyProducts(): void {
		this.bagService.buy(this.products).then(() => {
			console.log("ok");
			this.products = [];
			this.total = 0;
			this.count = 0;
			this.c.resetCount();
		});
	}

	private calculate(products) {
		for(let i=0; i < products.length; i++){
			products[i]["total"] = +products[i]["quantity"] * (+products[i]["price"]);
			this.total = this.total + products[i]["total"];
		}
		return products;
	}
}