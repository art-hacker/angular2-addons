import {Directive, HostBinding} from "@angular/core";

import {LoadingBarEvents} from "../..";
import {LoadingBar} from "../..";
import {LoadingBarState} from "../..";
import {map} from "rxjs/operators";

@Directive({
    selector: "[loading-bar]"
})
export class LoadingBarDirective {
    @HostBinding("style.width.%") width: number = 0;
    @HostBinding("style.opacity") opacty: number = 0;

    constructor(private loadingBarEvents: LoadingBarEvents) {
        loadingBarEvents.onChangeProgress
            .pipe(map((loadingBar: LoadingBar) => loadingBar.progress))
            .subscribe((progress: number) => this.width = progress);

        loadingBarEvents.onChangeState
            .pipe(map((loadingBar: LoadingBar) => loadingBar.state))
            .subscribe((state: LoadingBarState) => this.opacty = state)
    }
}