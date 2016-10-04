import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'bytes'})
export class BytesPipe implements PipeTransform {
	mbytes = 1024 * 1024;
	kbytes = 1024;
	min_value = 100;

	transform(value: number) {
		let result;
		if(value){
			if (value > this.min_value && value < this.kbytes) {
				result = value;
			}else if(value >= this.kbytes && value < this.mbytes) {
				result = (value / this.kbytes).toFixed(2) + "Kb";
			}else if(value > this.mbytes) {
				result = (value / this.mbytes).toFixed(2) + "Mb";
			}else{
				result = '0 bytes';
			}
		}
		return result;
	}
}