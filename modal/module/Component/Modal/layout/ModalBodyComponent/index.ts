import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "modal-body",
    template: "<ng-content></ng-content>",
    styles: [":host { display: block; border-bottom: 1px solid }"]
})
export class ModalBodyComponent {
    @HostBinding('style.background')
    @Input('background')
    public background = "white";
    
    @HostBinding('style.padding')
    @Input('padding')
    public padding = "15px";

    @HostBinding('style.border-color')
    @Input('border-color')
    public borderColor = "#e0e0e0";
    
}
