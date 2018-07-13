import {EventEmitter, Injectable} from "@angular/core";

import {LoadingBar} from "../..";

@Injectable()
export class LoadingBarEvents {
    public onChangeProgress = new EventEmitter<LoadingBar>();
    public onCompleteProgress = new EventEmitter<LoadingBar>();
    public onResetProgress = new EventEmitter<LoadingBar>();
    public onChangeState = new EventEmitter<LoadingBar>();
}