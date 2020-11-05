import { I18nManager } from 'react-native';
import Recipe from '../models/Recipe';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";
const maindishesen = require("../data/languages/maindishesen.json")
const maindishesru = require("../data/languages/maindishesru.json")

const translationGetters = {
    en: () => maindishesen,
    ru: () => maindishesru
};

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => config ? key + JSON.stringify(config) : key
);


export const setI18nConfigMain = () => {

    const fallback = { languageTag: "en", isRTL: false };

    const { languageTag, isRTL } =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) ||
        fallback;


    translate.cache.clear();

    I18nManager.forceRTL(isRTL);

    i18n.translations = {
        [languageTag]: translationGetters[languageTag]()
    };
    i18n.locale = languageTag;
};

export const dataRecipeMain = () => {

    let loadedRecipes = []
    try {

        let resData = JSON.parse(JSON.stringify(maindishesen));
        for (let key in resData.Recipes) {
            loadedRecipes.push(
                new Recipe(
                    translate("Recipes." + key + ".number"),
                    resData.Recipes[key].category,
                    resData.Recipes[key].meal,
                    translate("Recipes." + key + ".news"),
                    translate("Recipes." + key + ".kcal"),
                    translate("Recipes." + key + ".title"),
                    translate("Recipes." + key + ".ingredients"),
                    translate("Recipes." + key + ".direction")
                )
            );
        }

    } catch (err) {
        throw err;
    }
    return loadedRecipes;
}