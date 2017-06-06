import {Directive, ElementRef, OnInit} from "@angular/core";

@Directive({
    selector: "[ng-auto-focus]"
})
export class AutoFocusDirective implements OnInit {

    constructor(private elementRef: ElementRef) {};

    ngOnInit(): void {
        this.elementRef.nativeElement.focus();
    }

}