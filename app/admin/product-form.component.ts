import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { ImageResult, ResizeOptions, Conditions, checkConditions} from '../../mod_modules/ng2-imageupload/index';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// import { UploadService } from '../service/upload.service';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';

@Component({
	selector: 'admin',
	templateUrl: 'app/templates/product-form.component.html'
})

export class ProductFormComponent implements OnInit{ 
	product: Product;
	form: FormGroup;
	modify: boolean = false;
	id: number = 0;
	src: Array<ImageResult> = [];
	files: Array<any> = [];
    resizeOptions: ResizeOptions = {
        resizeMaxHeight: 74,
        resizeMaxWidth: 74
    };
    conditions: Conditions = {
    	maxHeight: 768,
    	maxWidth: 1024,
    	maxSize: 2097152,
    	types: ['png', "jpeg", "jpg"]
    }; 
    uploadErrors = {
    	image: []
    }

	constructor(
		// private uploadService: UploadService,
		private productService: ProductService,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private dragulaService: DragulaService
	) {
		this.form = fb.group({
			"name": ["", Validators.required],
			"quantity": ["", Validators.required],
			"price": ["", Validators.required],
			"images": [[]],
			"front":  [""],
			"short_description": [""],
			"description": [""]
		});
		 dragulaService.drop.subscribe((value) => {
	      this.onDrop(value.slice(1));
	    });
		// dragulaService.setOptions('first-bag', {
			/*moves: function (el, container, handle) {
				console.log(el);
				return handle.className === 'aaa';
			}*//*,
			remove: function (el, source) {
  return false;
}*//*,
			invalid: function (el, handle) {
			  return el.tagName === 'tr';
			}*//*,
			isContainer: function (el) {
				console.log(el.classList.contains('b'));
			    return el.classList.contains('b');
		    }*/
		// });
	}


	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			this.modify = true;
			this.id = +params['id'];
			if(!isNaN(this.id)){
				this.productService.getProduct(this.id).then((r) => {
					this.product = r[0];
					if(r[0].data){
						this.loadImages(r);
					}
					(<FormGroup>this.form).setValue({
		            	name:r[0].name,
		            	short_description: r[0].short_description,
		            	description: r[0].description,
		            	price: r[0].price,
		            	quantity: r[0].quantity,
		            	front: r[0].front,
		            	images: this.files}, { onlySelf: true 
	            	});
					
				});
			}
		});
		
	}

	saveProduct(): void {
		this.form.patchValue({images: this.files});
		if(this.form.valid) {
			this.productService
				.save(this.form.value, this.id)
				.then(() => window.history.back());	
		}
	}

	goBack(): void{
		window.history.back();
		event.preventDefault();
	}

	selected(imageResult: ImageResult, check: boolean = true) {
		console.log(imageResult);
		this.uploadErrors.image = [];
		let cond = checkConditions(imageResult.file, this.conditions);
		if(!check || cond["valid"]) {
		 	imageResult["newResized"] = /*imageResult.resized
	            && imageResult.resized.dataURL
	            ||*/ imageResult.dataURL;
	        this.src.push(imageResult);
	        if(this.files.length === 0 && check) {
	        	if(!isNaN(this.id)) {
	        		this.product.front = imageResult["file"]["name"];
	        	}
	    		this.form.patchValue({front: imageResult["file"]["name"]});
	        }
	        this.files.push({
	        	'data': imageResult["dataURL"],
	        	'name': imageResult["file"]["name"],
	        	'size': imageResult["file"]["size"],
	        	'type': imageResult["file"]["type"]
	        });
    	}
    	else{ 
			this.uploadErrors.image = cond["error"];
    	}
    }

    removeImage(image) {
    	this.src = this.src.filter(s => s !== image);
    	this.files = this.files.filter(s => s.name !== image.file.name);
    	if(image.file.name === this.form.get('front').value){
    		if(!isNaN(this.id)) {
    			this.product.front = (this.files.length > 0) ? this.files[0].name : "";
    		}
    		this.form.patchValue({front: (this.files.length > 0) ? this.files[0].name : ""});
    	}
    }

    private loadImages(p): void {
    	for(let i=0; i<p["length"];i++){
			var blob = new Blob([p[i].data], {type: `${p[i].type}`});
			var file = new File([blob], p[i].image_name);
			Object.defineProperty(file, 'type', { value: p[i].type});
			var object = {
				"dataURL": p[i].data,
				"url": p[i].name,
				"file": file
			};
			this.selected(object, false);
		}
    }

    private onDrop(args) {
	    let [e, el] = args;
	    let index = this.files.findIndex(x => x.name==e.className.split(" ")[0]);
	    this.arraymove(this.files, index, e.rowIndex-1);
  	}



  	private arraymove(arr, fromIndex, toIndex) {
  		var element = arr[fromIndex];
	    arr.splice(fromIndex, 1);
	    arr.splice(toIndex, 0, element);
	}
}
