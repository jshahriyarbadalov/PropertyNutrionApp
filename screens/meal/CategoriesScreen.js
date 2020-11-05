import React, { useEffect, useState } from 'react';
import {
    FlatList, Platform, View, StyleSheet,
    TouchableOpacity, Dimensions, ScrollView, Text, Share
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import CategoryItemGrid from '../../components/CategoryItemGrid';
import { setI18nConfig, dataCategory } from '../../Translate/CategoryTranslate';
import * as RNLocalize from "react-native-localize";
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';
import { setI18nConfigSalads, dataRecipeSalads } from '../../Translate/SaladsCtgTranslate';
import { setI18nConfigMain, dataRecipeMain } from '../../Translate/MainDishesTranslate';
import { setI18nConfigSoup, dataRecipeSoup } from '../../Translate/SoupsCtgTranslate';
import { setI18nConfigDessert, dataRecipeDesserts } from '../../Translate/DessertsCtgTranslate';
import FoodsItems from '../../components/FoodsItems';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import ImageSliderList from '../../components/ImageSliderList';

setI18nConfigs();

setI18nConfig();
let catData = dataCategory();
setI18nConfigSalads();
let dataRecip = dataRecipeSalads();
setI18nConfigMain();
let dataMain = dataRecipeMain();
setI18nConfigSoup();
let dataSoup = dataRecipeSoup();
setI18nConfigDessert();
let dataDessert = dataRecipeDesserts()
const CategoriesScreen = props => {
    const favoriteMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookedMeals = useSelector(state => state.cooked.cookedMeals);
    const cartedMeals = useSelector(state => state.cart.cartedMeals);
    setI18nConfigs();
    const handleLocalizationChange = () => {
        setI18nConfig();
        setI18nConfigSalads();
        setI18nConfigMain();
        setI18nConfigSoup();
        setI18nConfigDessert();
    };

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange());
    });
    useEffect(() => {
        RNLocalize.removeEventListener("change", handleLocalizationChange());
    });
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


    const renderGridItem = (itemData) => {
        return (
            <CategoryItemGrid
                title={itemData.item.title}
                color={itemData.item.color}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                onSelect={() => {
                    props.navigation.navigate("CategoryMeals",
                        {
                            categoryId: itemData.item.category,
                        }
                    );
                }}
            />
        );
    }
    const renderFoodItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.number === itemData.item.number);
        const isCooked = cookedMeals.some(meals => meals.number === itemData.item.number);
        const isCarted = cartedMeals.some(meals => meals.number === itemData.item.number);


        return (
            <FoodsItems
                title={itemData.item.title}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                starRate={itemData.item.news}
                starCount={itemData.item.news}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        foodId: itemData.item.number,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite,
                        isCook: isCooked,
                        isCart: isCarted,

                    });
                }} />
        );
    }

    return (
        <ScrollView>
            <View>

                <ImageSliderList listItemData={dataMain} navigation={props.navigation} />

                <View style={styles.list}>
                    <FlatList keyExtractor={(item, index) => item.category}
                        data={catData}
                        renderItem={renderGridItem}
                        horizontal={true}

                    />
                </View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{translate("salads")}</Text>
                    <View >
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            props.navigation.navigate("CategoryMeals",
                                {
                                    categoryId: 0,
                                }
                            );
                        }} >
                            <Text style={styles.btnTxt}>{translate("seeAll")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList keyExtractor={(item, index) => item.meal}
                        data={dataRecip}
                        renderItem={renderFoodItem}
                        horizontal={true}
                    />
                </View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{translate("mainDishes")}</Text>
                    <View >
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            props.navigation.navigate("CategoryMeals",
                                {
                                    categoryId: 1,

                                }
                            );
                        }} >
                            <Text style={styles.btnTxt}>{translate("seeAll")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList keyExtractor={(item, index) => item.meal}
                        data={dataMain}
                        renderItem={renderFoodItem}
                        horizontal={true}
                    />
                </View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{translate("soups")}</Text>
                    <View >
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            props.navigation.navigate("CategoryMeals",
                                {
                                    categoryId: 2,

                                }
                            );
                        }} >
                            <Text style={styles.btnTxt}>{translate("seeAll")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList keyExtractor={(item, index) => item.meal}
                        data={dataSoup}
                        renderItem={renderFoodItem}
                        horizontal={true}

                    />
                </View>
                <View style={styles.titleRow}>
                    <Text style={styles.title}>{translate("desserts")}</Text>
                    <View >
                        <TouchableOpacity style={styles.btn} onPress={() => {
                            props.navigation.navigate("CategoryMeals",
                                {
                                    categoryId: 3,

                                }
                            );
                        }} >
                            <Text style={styles.btnTxt}>{translate("seeAll")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList keyExtractor={(item, index) => item.meal}
                        data={dataDessert}
                        renderItem={renderFoodItem}
                        horizontal={true}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

CategoriesScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Share with friend',
                message: 'Look, recipes for world meals!   https://play.google.com/store/apps/details?id=mobi.devsteam.propertynutrition',
                url: 'https://play.google.com/store/apps/details?id=mobi.devsteam.propertynutrition'

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return {
        headerTitle: translate("mealCategories"),
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
        headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item iconName="md-share" onPress={() => { onShare() }} />
        </HeaderButtons>)

    };
};


export default CategoriesScreen;

const styles = StyleSheet.create({
    ctgView: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window') > 720 ? 30 : 14,
        color: 'gray',
        marginLeft: 10
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    btn: {
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        height: 25,
        width: 80,
        borderColor: Colors.primaryColor,
        backgroundColor: Colors.primaryColor,
        marginRight: 5
    },
    btnTxt: {
        color: 'white'
    },
    list: {
        margin: 10
    },

});