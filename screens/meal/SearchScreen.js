import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButtonOther';
import { setI18nConfig, dataRecipe } from '../../Translate/RecipeTranslate';
import MealList from '../../components/MealList';
import Voice from 'react-native-voice';
import * as RNLocalize from "react-native-localize";
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';

setI18nConfigs();
setI18nConfig();
let loadRecipes = dataRecipe();
const SearchScreen = props => {
    const [editText, setEditText] = useState("")
    const [results, setResults] = useState([]);
    const displayedMeals = loadRecipes.filter(meal => meal.title.toLowerCase() === editText);
    const handleLocalizationChange = () => {
        setI18nConfig();
    };

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange());
    });
    useEffect(() => {
        RNLocalize.removeEventListener("change", handleLocalizationChange());
    });

    const handleTyping = (intext) => {

        let text = intext;
        text = text.toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toLowerCase() + s.substring(1))
            .join(' ').trim();
        setEditText(text)
    };

    const audioTyping = () => {
        results.map((result, index) => {
            if (index === 0) {
                handleTyping(result);
            }
        });

    };
    const locales = RNLocalize.getLocales();
    const _startRecognizing = async () => {

        setResults(results)
        try {
            await locales.map((locale) => {
                if (locale.languageTag === 'ru-RU') {
                    Voice.start('ru-RU');
                } else {
                    Voice.start('en-US');
                }
            });
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        Voice.destroy().then(Voice.removeAllListeners);
    }, [Voice.destroy()])

    Voice.onSpeechResults = (e) => {
        setResults(e.value);
        audioTyping();
    };

    if (editText === "") {
        return (
            <View style={styles.screen}>
                <View style={styles.headerSearch}>
                    <View style={styles.searchtxt}>
                        <TextInput style={styles.textsearch}
                            onChangeText={(text) => { handleTyping(text) }}
                        />
                    </View>
                    <View style={styles.audioBtn}>
                        <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item title="Audio" iconName='microphone'
                                onPress={_startRecognizing} />
                        </HeaderButtons>
                    </View>
                </View>
                <MealList listData={loadRecipes} navigation={props.navigation} />
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <View style={styles.headerSearch}>
                <View style={styles.searchtxt}>
                    <TextInput style={styles.textsearch}
                        onChangeText={(text) => { handleTyping(text) }}
                    />
                </View>

                <View style={styles.audioBtn}>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item title="Audio" iconName='microphone'
                            onPress={_startRecognizing} />
                    </HeaderButtons>
                </View>
            </View>
            <MealList listData={displayedMeals} navigation={props.navigation} />
        </View >
    );
}
SearchScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    return {
        headerTitle: translate("search"),
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>)

    };
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textsearch: {
        height: 30,
        borderColor: 'gray',
        borderBottomWidth: 1,
        padding: 5
    },
    searchtxt: {
        width: "70%",
    },
    headerSearch: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 80,
        marginTop: 10
    },
    audioBtn: {
        marginTop: 9,

    }
});

export default SearchScreen;