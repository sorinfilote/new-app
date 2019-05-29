import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})

export class AutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(){
    this.elementRef.nativeElement.focus();
  }

}
