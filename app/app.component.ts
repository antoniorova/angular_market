import { Component, OnInit } from '@angular/core';
import { Bag } from './model/bag';
import { BagService } from './service/bag.service';

@Component({
	selector: 'my-app',
	templateUrl: 'app/templates/app.component.html'
})

export class AppComponent implements OnInit{
	bagElements: Array<Bag> = [];
	count: number = 0;

	constructor(private bagService: BagService){
		
	}

	ngOnInit(): void {
		this.bagService.getBag().then((r) => {
			this.bagElements = r;
			this.countBag(this.bagElements);
		});
		
	}

	countBag(element) {
		element.forEach(x => this.count = +x.quantity + this.count);
	}

	updateValue(num) {
		this.count = this.count + num;
	}

	resetCount() {
		this.bagElements = [];
		this.count = 0;
	}
}