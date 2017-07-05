import {Component} from "@angular/core";

@Component({
    selector: "modal-body",
    template: "<ng-content></ng-content>",
    styleUrls: ["./style.shadow.scss"]
})
export class ModalBodyComponent {
}
