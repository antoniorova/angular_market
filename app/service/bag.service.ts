import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Bag } from '../model/bag';
import { Product } from '../model/product';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BagService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private baseUrl = 'http://localhost/api/src/api.php';

	constructor(private http: Http) {}

	getBag(): Promise<Bag[]> {
		let url = `${this.baseUrl}/GetBag`;
		return this.http.get(url)
				.toPromise()
				.then(r => r.json() as Bag[])
				.catch(this.handlerError); 

	}
/*	getProduct(id: number): Promise<Product> {
		let url = `${this.baseUrl}/${id}`;
		return this.http.get(url)
				.toPromise()
				.then(r => r.json() as Product)
				.catch(this.handlerError); 

	}*/

	updateProduct(product: Bag): Promise<Bag> {
		const url  = `${this.baseUrl}/UpdateProductBag/${product.id}`;
		product.quantity = +product.quantity + 1;
		return this.http
					.put(url, JSON.stringify(product))
					.toPromise()
					.then(() => product)
					.catch(this.handlerError); 

	}

	buy(products: Array<Bag>): Promise<void> {
		let url  = `${this.baseUrl}/BuyProducts`;
		return this.http.delete(url)
				 .toPromise()
				 .then(() => null)
				 .catch(this.handlerError);
	}

	addProduct(product: Product, existP: any): Promise<Bag> {
		if(existP.length > 0){
			return this.updateProduct(existP[0]);
		}else {
			return this.add(product);
		}
	}

	add(product: Product): Promise<Bag> {
		let url = `${this.baseUrl}/AddProductBag`;
		let product2bag = {
    		id_product: product.id,
			name: product.name,
			quantity: 1
	    };
		return this.http
			.post(url, JSON.stringify(product2bag))
			.toPromise()
			.then(res => {
				product2bag["id"] = res.json().data;
				return product2bag;
			})
			.catch(this.handlerError);
	}

	handlerError(error: any): void {
		console.log(error);
		console.log('An error ocurred' + error);
	}
}