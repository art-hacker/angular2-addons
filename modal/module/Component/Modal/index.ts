import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from "@angular/core";
import {ModalCloseMode} from "../../Entity/ModalCloseMode";

@Component({
    selector: "modal",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class ModalComponent {
    @Input("width") width: string = "auto";
    @Input("height") height: string = "auto";
    @Input("backdrop") backdrop: boolean = true;
    @Input("animation") animation: boolean = true;
    @Input("close-mode") closeMode: ModalCloseMode = ModalCloseMode.backdrop;
    @Output("on-close") onClose = new EventEmitter<void>();

    constructor(private elRef: ElementRef) {}

    @HostListener('click', ['$event.target'])
    private backdropClose(target: HTMLElement) {
        let modal: HTMLElement = this.elRef.nativeElement.querySelector('.modal');
        if(this.closeMode == ModalCloseMode.backdrop && (target == modal || target == modal.children[0])) {
            this.close();
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    public close(): void {
        this.onClose.emit();
    }
}