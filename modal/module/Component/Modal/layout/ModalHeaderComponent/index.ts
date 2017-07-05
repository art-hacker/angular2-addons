import {Component, Input, Host} from "@angular/core";
import {ModalComponent} from "../../index";

@Component({
    selector: "modal-header",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ModalHeaderComponent {
    @Input("title") title: string;
    public parent: ModalComponent;
    
    constructor(@Host() parent: ModalComponent) {
        this.parent = parent;
    }
}
