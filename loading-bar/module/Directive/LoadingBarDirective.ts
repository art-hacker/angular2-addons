import {Directive, HostBinding} from "@angular/core";

import {LoadingBarEvents} from "../Event/LoadingBarEvents";
import {LoadingBar} from "../Entity/LoadingBar";
import {LoadingBarState} from "../Entity/LoadingBarState";

@Directive({
    selector: "[loading-bar]"
})
export class LoadingBarDirective {
    @HostBinding("style.width.%") width: number = 0;
    @HostBinding("style.opacity") opacty: number = 0;

    constructor(private loadingBarEvents: LoadingBarEvents) {
        loadingBarEvents.onChangeProgress
            .map((loaderBar: LoadingBar) => loaderBar.progress)
            .subscribe((progress: number) => this.width = progress);

        loadingBarEvents.onChangeState
            .map((loaderBar: LoadingBar) => loaderBar.state)
            .subscribe((state: LoadingBarState) => this.opacty = state)
    }
}