import {NgModule} from "@angular/core";

import {AutoFocusDirective} from "./focus.directive";

@NgModule({
    declarations: [
        AutoFocusDirective
    ],
    exports: [
        AutoFocusDirective
    ]
})
export class FocusModule {}