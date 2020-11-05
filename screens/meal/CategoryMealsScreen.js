import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MealList from '../../components/MealList';
import DefaultText from '../../components/DefaultText';
import CustomMenu from '../../components/CustomMenu';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { setI18nConfig, dataRecipe } from '../../Translate/RecipeTranslate';
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';


setI18nConfigs();
setI18nConfig();
let loadData = dataRecipe();

const CategoryMealsScreen = props => {
    setI18nConfig();
    setI18nConfigs();

    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get('window').width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get('window').height
    );

    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        }
        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    const [atoZ, setAtoZ] = useState(false);
    const [ztoA, setZtoA] = useState(false);
    const [sort, setSort] = useState(true);
    const catId = props.navigation.getParam('categoryId');
    const [...displayedMeals] = loadData.filter(meal => meal.category.indexOf(catId) >= 0);


    const sortName = (itemA, itemB) => {

        let nameA = itemA.title.toLowerCase(), nameB = itemB.title.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    };

    const reverseName = (itemA, itemB) => {

        let nameA = itemA.title.toLowerCase(), nameB = itemB.title.toLowerCase();
        if (nameA > nameB) {
            return -1;
        }
        if (nameA < nameB) {
            return 1;
        }
        return 0;
    };
    const reversed = () => {
        setZtoA(false);
        setSort(false);

        if (atoZ) {
            return (
                <View style={styles.screen}>
                    <View>
                        <CustomMenu menutext="Sort"
                            menustyle={{
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginLeft: Dimensions.get('window').height > 910 ? 400 : 270
                            }}
                            textStyle={{
                                fontSize: Dimensions.get('window').height > 910 ? 20 : 13,
                                marginTop: 3,
                                color: 'red',
                            }}
                            option1Click={() => setAtoZ(true)}
                            option2Click={() => setZtoA(true)}
                        />
                    </View>
                    <MealList listData={[...displayedMeals].sort(sortName)} navigation={props.navigation} />
                </View>
            );
        };
    };
    const sorted = () => {
        setAtoZ(false);
        setSort(false);
        if (ztoA) {
            return (
                <View style={styles.screen}>
                    <View>
                        <CustomMenu menutext="Sort"
                            menustyle={{
                                marginTop: 5,
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginLeft: Dimensions.get('window').height > 910 ? 400 : 270
                            }}
                            textStyle={{
                                fontSize: Dimensions.get('window').height > 910 ? 20 : 13,
                                marginTop: 3,
                                color: 'red',
                            }}
                            option1Click={() => setAtoZ(true)}
                            option2Click={() => setZtoA(true)}
                        />
                    </View>
                    <MealList listData={[...displayedMeals].sort(reverseName)} navigation={props.navigation} />
                </View>

            );
        };
    };
    if (displayedMeals.length === 0) {
        return (
            <View style={styles.screen}>
                <DefaultText>No meals found, maybe check your category? </DefaultText>
            </View>
        );
    }
    if (sort) {
        return (
            <View style={styles.screen}>
                <View>
                    <CustomMenu menutext="Sort"
                        menustyle={{
                            marginTop: 5,
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginLeft: Dimensions.get('window').height > 910 ? 400 : 270
                        }}
                        textStyle={{
                            fontSize: Dimensions.get('window').height > 910 ? 20 : 13,
                            marginTop: 3,
                            color: 'red',
                        }}
                        option1Click={() => sorted}
                        option2Click={() => reversed}
                    />
                </View>
                <MealList listData={[...displayedMeals].sort()} navigation={props.navigation} />
            </View>
        );
    }
}

CategoryMealsScreen.navigationOptions = () => {
    setI18nConfigs();
    return {
        headerTitle: translate("meals"),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName={Platform.OS === 'android' ? "md-search" : "ios-search"} onPress={() => {
                navData.navigation.navigate("Search");
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

});

export default CategoryMealsScreen;