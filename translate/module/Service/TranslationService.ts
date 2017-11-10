import {Injectable, Optional} from "@angular/core";

import {Dictionaries, DictionariesNavigatorAliases, Dictionary, Locale} from "../Entity/Definitions";
import {TranslationConfigService} from "./TranslationConfigService";

const localStorage = typeof window !='undefined' ? window.localStorage : { getItem(key: any): any { return null }, removeItem(key: any) {}, setItem(key: any, val: any) {} };

@Injectable()
export class TranslationService {
    private dictionaries: Dictionaries;
    private locale: Locale;
    private aliases: DictionariesNavigatorAliases;

    constructor(@Optional() config: TranslationConfigService) {
        if (!config) {
            throw new Error(`Config if not defined! Use TranslationModule.setConfig(dictionaries: Dictionaries, locale: Locale)`);
        }

        this.dictionaries = config.dictionaries;
        this.aliases = config.aliases;
        this.locale = <Locale>localStorage.getItem("locale") || this.getDefaultLocale() || config.locale;
    }

    public translate(value: string): string {
        if (!this.dictionaries.hasOwnProperty(this.getLocale())) {
            throw new Error(`Locale ${this.getLocale()} does not exist`);
        }
        
        let dictionary : Dictionary = this.dictionaries[this.getLocale()]
            .reduce((previous: Dictionary, current: Dictionary) => Object.assign(previous, current));

        return dictionary[value] || value;
    }

    public getLocale(): Locale {
        return this.locale;
    }

    public setLocale(locale: Locale): void {
        this.locale = locale;
        localStorage.setItem("locale", locale);
    }

    public getDefaultLocale(): Locale | void {
        if(typeof navigator == 'undefined') 
            return;
        
        for (let locale in this.aliases) {
            if (this.aliases.hasOwnProperty(locale)) {
                let isLangExist = this.aliases[<Locale>locale].filter(
                        (navigatorLanguage: string) => navigatorLanguage === navigator.language
                    ).length > 0;

                if (isLangExist) return <Locale>locale;
            }
        }
    }
}