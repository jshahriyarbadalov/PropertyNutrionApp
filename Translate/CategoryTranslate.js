import { I18nManager } from 'react-native';
import Category from '../models/Category';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";


const translationGetters = {
    en: () => require("../data/languages/categoryen.json"),
    ru: () => require("../data/languages/categoryru.json")
};

const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => config ? key + JSON.stringify(config) : key
);


export const setI18nConfig = () => {

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

export const dataCategory = () => {
    let loadedCategories = []
    try {
        let categoryen = require('../data/languages/categoryen.json');
        let resData = JSON.parse(JSON.stringify(categoryen));
        for (let key in resData) {
            loadedCategories.push(
                new Category(
                    translate(key + ".number"),
                    translate(key + ".category"),
                    translate(key + ".title"),
                    resData[key].color
                )
            );
        }

    } catch (err) {
        throw err;
    }

    return loadedCategories;
};
