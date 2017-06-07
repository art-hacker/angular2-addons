import {LoadingBarState} from "./LoadingBarState";

export interface LoadingBar {
    progress: number;
    state: LoadingBarState;
}