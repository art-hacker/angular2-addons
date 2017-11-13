import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {LoadingBarEvents} from "../Event/LoadingBarEvents";
import {LoadingBar} from "../Entity/LoadingBar";
import {LoadingBarState} from "../Entity/LoadingBarState";

import {LoadingBarSubscriptions} from "../Subscription/LoadingBarSubscriptions";

@Injectable()
export class LoadingBarService {

    private loadingBar: LoadingBar = {
        progress: 0,
        state: LoadingBarState.Inactive
    };

    constructor(
        private event: LoadingBarEvents,
        private subscription: LoadingBarSubscriptions
    ) {
        this.event.onChangeProgress.subscribe((loadingBar: LoadingBar) => {
            if (loadingBar.progress > 0)
                this.activate();

            if (loadingBar.progress == 100)
                this.event.onCompleteProgress.emit(loadingBar);

            if (loadingBar.progress == 0)
                this.event.onResetProgress.emit(loadingBar);

        });

        this.event.onCompleteProgress.subscribe(() => {
            this.subscription.completeProgressSubscription.unsubscribe();

            this.subscription.completeProgressSubscription = Observable
                .interval(300)
                .take(2).subscribe((step: number) => {
                    switch (step) {
                        case 0:
                            this.deactivate();
                            break;
                        case 1:
                            this.resetProgress();
                            break;
                    }
                });
        });
    }

    public setProgress(progress: number): void {
        this.loadingBar.progress = progress;
        this.event.onChangeProgress.emit(this.getLoadingBar);
    }

    public incProgress(): void {
        this.setProgress(this.getLoadingBar.progress + 1);
    }

    public completeProgress(): void {
        this.stopProgress();
        this.setProgress(100);
    }

    public resetProgress(): void {
        this.stopProgress();
        this.deactivate();
        this.setProgress(0);
    }

    public startProgress(duration = 500): void {
        this.stopProgress();
        this.incProgress();
        this.subscription.startProgressSubscription = Observable
            .interval(duration)
            .take(100 - this.getLoadingBar.progress)
            .subscribe(() => this.incProgress());
    }

    public stopProgress(): void {
        this.subscription.startProgressSubscription.unsubscribe();
    }

    public activate(): void {
        this.loadingBar.state = LoadingBarState.Active;
        this.event.onChangeState.emit(this.getLoadingBar);
    }

    public deactivate(): void {
        this.loadingBar.state = LoadingBarState.Inactive;
        this.event.onChangeState.emit(this.getLoadingBar);
    }

    public get getLoadingBar(): LoadingBar {
        return this.loadingBar;
    }
}