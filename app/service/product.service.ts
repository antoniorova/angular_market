import { Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Product } from '../model/product';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

	// private headers = new Headers({'Content-Type': 'application/json'});
	private baseUrl = 'http://localhost/api/src/api.php';

	constructor(private http: Http) {}

	getProducts(): Promise<Product[]> {
		let url = `${this.baseUrl}/GetProducts`;
		return this.http.get(url)
				.toPromise()
				.then(r => r.json() as Product[])
				.catch(this.handlerError); 

	}
	getProduct(id: number): Promise<Product> {
		let url = `${this.baseUrl}/GetProduct/${id}`;
		return this.http.get(url)
				.toPromise()
				.then(r => r.json() as Product)
				.catch(this.handlerError); 

	}

	/*getCountries(){
		let ctrUrl = 'https://restcountries.eu/rest/v1/all';

		return this.http.get(ctrUrl)
				.toPromise()
				.then(r => r.json())
				.catch(this.handlerError); 
	}*/

	updateProduct(product: Product, id: number): Promise<Product> {
		console.log(product);
		const url  = `${this.baseUrl}/UpdateProduct/${id}`;
		return this.http
					.put(url, JSON.stringify(product))
					.toPromise()
					.then(() => product)
					.catch(this.handlerError); 

	}

	deleteProduct(id: number): Promise<void> {
		const url  = `${this.baseUrl}/DeleteProduct/${id}`;
		return this.http.delete(url)
		.toPromise().then(() => null).catch(this.handlerError); 

	}

	save(product: Product, id: number): Promise<Product> {
		if(id > 0){
			return this.updateProduct(product, id);
		}else {
			return this.create(product);
		}
	}
	create(product: Product): Promise<Product> {
		let url = `${this.baseUrl}/SaveProduct`;
		return this.http
			.post(url, JSON.stringify(product))
			.toPromise()
			.then(res => res.json().data)
			.catch(this.handlerError);
	}

	//		a = this.uploadService.upload('aaa', this.files);

	handlerError(error: any): void {
		console.log(error);
		console.log('An error ocurred' + error);
	}
}