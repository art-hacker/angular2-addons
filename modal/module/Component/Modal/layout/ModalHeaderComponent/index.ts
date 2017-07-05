import {Component, Host} from "@angular/core";

import {ModalComponent} from "../../index";

@Component({
    selector: "modal-header",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ModalHeaderComponent {
    public parent: ModalComponent;
    
    constructor(@Host() parent: ModalComponent) {
        this.parent = parent;
    }
}
