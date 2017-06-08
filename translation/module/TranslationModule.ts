import {ModuleWithProviders, NgModule} from "@angular/core";

import {TranslationPipe} from "./Pipe/TranslationPipe";
import {TranslationService} from "./Service/TranslationService";
import {TranslationConfigService} from "./Service/TranslationConfigService";
import {Dictionaries, DictionariesNavigatorAliases, Locale} from "./Entity/Definitions";

@NgModule({
    declarations: [
        TranslationPipe,
    ],
    providers: [
        TranslationService
    ],
    exports: [
        TranslationPipe
    ]
})
export class TranslationModule {
    static setConfig(dictionaries: Dictionaries, locale: Locale, aliases: DictionariesNavigatorAliases): ModuleWithProviders {
        return {
            ngModule: TranslationModule,
            providers: [
                {
                    provide: TranslationConfigService,
                    useValue: {
                        dictionaries: dictionaries, 
                        locale: locale, 
                        aliases: aliases
                    }
                }
            ]
        };
    }
}