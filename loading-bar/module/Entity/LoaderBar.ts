import {LoaderBarState} from "./LoaderBarState";

export interface LoaderBar {
    progress: number;
    state: LoaderBarState;
}