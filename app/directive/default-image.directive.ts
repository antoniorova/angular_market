import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({ selector: '[myDefaultImage]' })
export class DefaultImageDirective {

	default = "medium";
	// @Input('myDefaultImage') image: string;
	@Input() set mySetDefaultImage(type: string){
	    this.setImage(type);
	}
    constructor(private el: ElementRef, private renderer: Renderer) {
       //renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'yellow');
       this.setImage(this.default);
    }

    private setImage(type: string) {
       if(type === 'large'){
       		this.renderer.setElementStyle(this.el.nativeElement, 'height', '25em');
       		this.renderer.setElementProperty(this.el.nativeElement, 'src', 'app/images/default-img-large.gif');
       }else{
   			this.renderer.setElementProperty(this.el.nativeElement, 'src', 'app/images/default-img.gif');
       }
       this.renderer.setElementProperty(this.el.nativeElement, 'alt', 'Default Image');
       
	}
}