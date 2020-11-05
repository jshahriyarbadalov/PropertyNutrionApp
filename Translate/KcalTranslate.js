import { I18nManager } from 'react-native';
import Calorie from '../models/Calorie';
import * as RNLocalize from "react-native-localize";
import i18n from "i18n-js";
import memoize from "lodash.memoize";


const translationGetters = {
    en: () => require("../data/kcaltaben.json"),
    ru: () => require("../data/kcaltabru.json")
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

export const dataCalorie = () => {
    let loadedCalories = []
    try {
        let kcaltaben = require('../data/kcaltaben.json');
        let resData = JSON.parse(JSON.stringify(kcaltaben));
        for (let key in resData.KcalTab) {
            loadedCalories.push(
                new Calorie(
                    translate("KcalTab." + key + ".name"),
                    translate("KcalTab." + key + ".protein"),
                    translate("KcalTab." + key + ".fat"),
                    translate("KcalTab." + key + ".carbo"),
                    translate("KcalTab." + key + ".kcal"),
                    translate("KcalTab." + key + ".kcal")
                )
            );
        }

    } catch (err) {
        throw err;
    }

    return loadedCalories;
};