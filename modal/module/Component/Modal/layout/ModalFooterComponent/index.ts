import {Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "modal-footer",
    template: "<ng-content></ng-content>",
    styles: [":host { display: block; }"]
})
export class ModalFooterComponent {
    @HostBinding('style.background')
    @Input('background')
    public background = "white";

    @HostBinding('style.padding')
    @Input('padding')
    public padding = "15px";
}
