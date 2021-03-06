import {Pipe, PipeTransform} from "@angular/core";

import {TranslationService} from "../Service/TranslationService";

@Pipe({
    name: "translate",
    pure: false
})
export class TranslationPipe implements PipeTransform {

    constructor(private translationService: TranslationService) {}

    transform(value: string, ...args: any[]): string {
        return this.translationService.translate(value);
    }
}