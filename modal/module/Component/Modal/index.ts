import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from "@angular/core";
import {ModalCloseMode} from "../../Entity/ModalCloseMode";

@Component({
    selector: "modal",
    templateUrl: "./template.pug",
    host: {"(window:keydown)": "onKeyDown($event)"},
    styleUrls: ["./style.shadow.scss"]
})

export class ModalComponent {
    @Input("width") width: string = "auto";
    @Input("height") height: string = "auto";
    @Input("backdrop") backdrop: boolean = true;
    @Input("animation") animation: boolean = true;
    
    @Input("close-mode") closeMode: ModalCloseMode = ModalCloseMode.backdrop;
    
    @Output("on-close") onClose = new EventEmitter<void>();
    @ViewChild('modal') modal: ElementRef;

    constructor(private elRef: ElementRef) {}

    @HostListener('click', ['$event.target'])
    private backdropClose(target: HTMLElement) {
        if(this.closeMode == ModalCloseMode.backdrop && target == this.elRef.nativeElement.querySelector('.modal')) {
            this.close();
        }
    }    
    
    private onKeyDown($event: KeyboardEvent): void {
        if ($event.key === "Escape" && this.closeMode != ModalCloseMode.none) {
            this.close()
        }
    }

    public close(): void {
        this.onClose.emit();
    }
}