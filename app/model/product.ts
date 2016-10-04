export class Product {

	constructor(
		public id: number,
		public name: string,
		public quantity: number,
		public price: number,
		public images?: Array<File>,
		public front?: string,
		public short_description?: string,
		public description?: string
	) {}
}