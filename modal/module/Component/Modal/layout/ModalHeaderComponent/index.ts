import {Component, Host, HostBinding, Input} from "@angular/core";

import {ModalComponent} from "../../index";

@Component({
    selector: "modal-header",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ModalHeaderComponent {
    @HostBinding('style.background')
    @Input('background')
    public background = "#f5f5f5"; //material-color("grey", '100');

    @HostBinding('style.padding')
    @Input('padding')
    public padding = "15px";

    @HostBinding('style.border-color')
    @Input('border-color')
    public borderColor = "#e0e0e0";

   
    public parent: ModalComponent;
    
    constructor(@Host() parent: ModalComponent) {
        this.parent = parent;
    }
}
