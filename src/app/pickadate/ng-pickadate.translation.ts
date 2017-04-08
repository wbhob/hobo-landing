declare var require;

export class TranslationHelper {
    private userLang: string = 'EN';
    constructor(userLang: string) {
        /* next line is a workaround for https://github.com/amsul/pickadate.js/issues/709 */
        jQuery.fn.pickatime = { defaults: {} };
    }

    loadLanguage() {
        switch (this.userLang) {
            case 'DE':
                require('pickadate/lib/translations/de_DE');
                break;

            case 'ES':
                require('pickadate/lib/translations/es_ES');
                break;

            case 'FR':
                require('pickadate/lib/translations/fr_FR');
                break;
            case 'GB':
                // english is loaded by default, nothing to do...
                break;

            case 'EN':
                // is default language, nothing to do...
                break;

            default:
                // ... is english
                break;
        }
    }
}