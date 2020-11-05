import React, { useEffect, useCallback, useState } from 'react';
import {
    View, ScrollView, Text, Dimensions,
    StyleSheet, TouchableOpacity, ImageBackground, ToastAndroid
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButtonFav';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, addCooked, addCart } from '../../store/action/recipes';
import { Container, Tab, Tabs } from 'native-base';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';
import { setI18nConfig, dataRecipe } from '../../Translate/RecipeTranslate';
import * as RNLocalize from "react-native-localize";
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';
import Colors from '../../constants/Colors';
import RateStar from '../../components/RateStar';
import AsyncStorage from '@react-native-community/async-storage';

const ListItem = props => {
    return (< View style={styles.listItem} >
        <Text style={styles.txtInfo} > {props.children} </Text>
    </View >
    );
};
setI18nConfigs();
setI18nConfig();
const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    return s;
};
let loadData = dataRecipe();
const MealDetailScreen = props => {
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
    const handleLocalizationChange = () => {
        setI18nConfig();
        setI18nConfigs();
    };
    const locales = RNLocalize.getLocales();
    const local = locales.some(lang => lang.languageCode === "ru")

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange());
    });
    useEffect(() => {
        RNLocalize.removeEventListener("change", handleLocalizationChange());
    });

    const availableMeals = useSelector(state => state.recipe.meals);
    const foodId = props.navigation.getParam('foodId');
    const currentMealIsFavorite = useSelector(
        state => state.recipe.favoriteMeals.some(meal => meal.number === foodId)
    );

    const currentMealIsCooked = useSelector(
        state => state.cooked.cookedMeals.some(meal => meal.number === foodId)
    );
    const currentMealIsCart = useSelector(
        state => state.cart.cartedMeals.some(meal => meal.number === foodId)
    );


    //const selectedMeal = availableMeals.find(meal => meal.number === foodId);
    //console.log('hello', countRateStar);
    const dispatch = useDispatch();

    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(foodId));
    }, [dispatch, foodId]);

    const cookedHandler = useCallback(() => {
        dispatch(addCooked(foodId));
    }, [dispatch, foodId]);

    const cartHandler = useCallback(() => {
        dispatch(addCart(foodId));
    }, [dispatch, foodId]);



    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
        props.navigation.setParams({ clickCooked: cookedHandler });
        props.navigation.setParams({ clickCart: cartHandler });

    }, [toggleFavoriteHandler, cookedHandler, cartHandler]);

    useEffect(() => {
        props.navigation.setParams({ isFav: currentMealIsFavorite });
        props.navigation.setParams({ isCook: currentMealIsCooked });
        props.navigation.setParams({ isCart: currentMealIsCart });

    }, [currentMealIsFavorite, currentMealIsCooked, currentMealIsCart]);

    const isCook = props.navigation.getParam('isCook')
    const isCart = props.navigation.getParam('isCart');
    const isFavorite = props.navigation.getParam('isFav');
    const mealTitle = props.navigation.getParam('mealTitle');


    const EVENT_TITLE = mealTitle;
    const TIME_NOW_IN_UTC = moment.utc();

    const addToCalendar = (title, startDateUTC) => {
        const eventConfig = {
            title,
            startDate: utcDateToString(startDateUTC),
            endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
            notes: 'tasty!',
            navigationBarIOS: {
                tintColor: 'orange',
                backgroundColor: 'green',
                titleColor: 'blue',
            },
        };

        AddCalendarEvent.presentEventCreatingDialog(eventConfig)
            .then((eventInfo = {
                calendarItemIdentifier,
                eventIdentifier
            }) => {
                console.warn(JSON.stringify(eventInfo));
            })
            .catch((error) => {

                console.warn(error);
            });
    };

    const toCookedAdd = () => {
        cookedHandler()
        ToastAndroid.show(translate("addedToCooked"), ToastAndroid.SHORT);
    }
    const toCookedRemove = () => {
        cookedHandler()
        ToastAndroid.show(translate("removedToCooked"), ToastAndroid.SHORT);
    }
    const toCartAdd = () => {
        cartHandler();
        ToastAndroid.show(translate("addedToCart"), ToastAndroid.SHORT);
    }
    const toCartRemove = () => {
        cartHandler();
        ToastAndroid.show(translate("removedToCart"), ToastAndroid.SHORT);
    }
    const toFavoriteAdd = () => {
        toggleFavoriteHandler()
        ToastAndroid.show(translate("addedToFavorite"), ToastAndroid.SHORT);
    }
    const toFavoriteRemove = () => {
        toggleFavoriteHandler()
        ToastAndroid.show(translate("removedToFavorite"), ToastAndroid.SHORT);
    }

    // const [starCount, setStarCount] = useState(0);

    // const storeData = async (keyId, rating) => {

    //     let data = { id: keyId, count: rating }
    //     try {
    //         if (keyId === foodId) {
    //             const jsonValue = JSON.stringify(data)
    //             await AsyncStorage.setItem('mealRate', jsonValue);
    //         }
    //     } catch (e) {
    //         // saving error
    //         console.log("error", e)
    //     }

    // }

    // const getData = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('mealRate')
    //         let rateParse = JSON.parse(jsonValue);

    //         if (rateParse.id === foodId) {
    //             setStarCount(rateParse.count);
    //         }

    //     } catch (e) {
    //         // error reading value
    //         console.log("error", e)
    //     }

    // };

    // useEffect(() => {
    //     getData();
    // });

    return (
        <ScrollView >
            <View style={styles.details} >
                {loadData.map(
                    items => {
                        if (items.number === foodId) {
                            return (
                                <Text style={styles.titleMeal}> {items.title} </Text>
                            )
                        }
                    })
                }

            </View >

            {
                loadData.map(
                    items => {
                        if (items.number === foodId) {

                            if (local) {
                                return (
                                    <View>
                                        <ImageBackground source={{ uri: 'https://proper-nutrition.exyte.top/Data/en/images/img' + items.number + '.jpg' }} style={styles.image} >
                                            <View style={styles.compWrap}>
                                                <View style={styles.favIcon}>
                                                    <HeaderButtons HeaderButtonComponent={HeaderButton} >
                                                        {isFavorite ?
                                                            <Item title="Favorite"
                                                                iconName="ios-heart"
                                                                onPress={toFavoriteRemove}
                                                            /> : <Item title="Favorite"
                                                                iconName='ios-heart-empty'
                                                                onPress={toFavoriteAdd}
                                                            />}
                                                    </HeaderButtons >
                                                </View>
                                                <View style={styles.titleContainer}>
                                                    <Text style={styles.title} numberOfLines={3}>БЖУ: {items.kcal}</Text>
                                                    <View style={styles.btnContainer}>
                                                        {isCook ?
                                                            (<TouchableOpacity style={styles.btnClick}
                                                                onPress={toCookedRemove}>
                                                                <Text style={styles.titleClick}>{translate("cooked")}</Text>
                                                            </TouchableOpacity>) :
                                                            (<TouchableOpacity style={styles.btn}
                                                                onPress={toCookedAdd}>
                                                                <Text style={styles.titles}>{translate("cooked")}</Text>
                                                            </TouchableOpacity>)}
                                                        {isCart ? (<TouchableOpacity style={styles.btnClick}
                                                            onPress={toCartRemove}>
                                                            <Text style={styles.titleClick}>{translate("cart")}</Text>
                                                        </TouchableOpacity>) :
                                                            (<TouchableOpacity style={styles.btn}
                                                                onPress={toCartAdd}>
                                                                <Text style={styles.titles}>{translate("cart")}</Text>
                                                            </TouchableOpacity>)}
                                                        <TouchableOpacity style={styles.btn}
                                                            onPress={() => { addToCalendar(EVENT_TITLE, TIME_NOW_IN_UTC) }}>
                                                            <Text style={styles.titles}>{translate("toPlan")}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                        <View style={styles.star}>
                                            < RateStar
                                                starRate={items.news}
                                                //onStarPress={rating => storeData(items.number, rating)}
                                                starTitle={items.news}
                                            />
                                        </View>
                                    </View>
                                )
                            }
                            else {
                                return (
                                    <View>
                                        <ImageBackground source={{ uri: 'https://proper-nutrition.exyte.top/Data/en/images/img' + items.number + '.jpg' }} style={styles.image} >
                                            <View style={styles.compWrap}>
                                                <View style={styles.favIconLocal}>
                                                    <HeaderButtons HeaderButtonComponent={HeaderButton} >
                                                        {isFavorite ?
                                                            <Item title="Favorite"
                                                                iconName="ios-heart"
                                                                onPress={toFavoriteRemove}
                                                            /> : <Item title="Favorite"
                                                                iconName='ios-heart-empty'
                                                                onPress={toFavoriteAdd}
                                                            />}
                                                    </HeaderButtons >
                                                </View>
                                                <View style={styles.titleContainerLocal}>

                                                    <View style={styles.btnContainerLocal}>
                                                        {isCook ?
                                                            (<TouchableOpacity style={styles.btnClick}
                                                                onPress={toCookedRemove}>
                                                                <Text style={styles.titleClick}>{translate("cooked")}</Text>
                                                            </TouchableOpacity>) :
                                                            (<TouchableOpacity style={styles.btn}
                                                                onPress={toCookedAdd}>
                                                                <Text style={styles.titles}>{translate("cooked")}</Text>
                                                            </TouchableOpacity>)}
                                                        {isCart ? (<TouchableOpacity style={styles.btnClick}
                                                            onPress={toCartRemove}>
                                                            <Text style={styles.titleClick}>{translate("cart")}</Text>
                                                        </TouchableOpacity>) :
                                                            (<TouchableOpacity style={styles.btn}
                                                                onPress={toCartAdd}>
                                                                <Text style={styles.titles}>{translate("cart")}</Text>
                                                            </TouchableOpacity>)}
                                                        <TouchableOpacity style={styles.btn}
                                                            onPress={() => { addToCalendar(EVENT_TITLE, TIME_NOW_IN_UTC) }}>
                                                            <Text style={styles.titles}>{translate("toPlan")}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </ImageBackground>
                                        <View style={styles.star}>
                                            < RateStar
                                                starRate={items.news}
                                                //onStarPress={rating => storeData(items.number, rating)}
                                                starTitle={items.news}
                                            />
                                        </View>
                                    </View>
                                )
                            }

                        }
                    })
            }


            <Container>
                <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 1 }}>
                    <Tab
                        activeTabStyle={{ backgroundColor: 'white' }}
                        tabStyle={{ backgroundColor: 'white' }}
                        textStyle={{
                            color: 'black',
                            fontSize: Dimensions.get('window').height > 910 ? 20 : 16
                        }}
                        activeTextStyle={{
                            color: 'black',
                            fontWeight: 'normal',
                            fontSize: Dimensions.get('window').height > 910 ? 20 : 16
                        }}
                        heading={translate("ingredients")}>
                        {
                            loadData.map(
                                items => {
                                    if (items.number === foodId) {
                                        return (
                                            <ListItem key={items.number}>{items.ingredients}</ListItem>
                                        )
                                    }
                                })
                        }
                    </Tab>
                    <Tab activeTabStyle={{ backgroundColor: 'white' }}
                        tabStyle={{ backgroundColor: 'white' }}
                        textStyle={{
                            color: 'black',
                            fontSize: Dimensions.get('window').height > 910 ? 20 : 16
                        }}
                        activeTextStyle={{
                            color: 'black',
                            fontWeight: 'normal',
                            fontSize: Dimensions.get('window').height > 910 ? 20 : 16
                        }}
                        heading={translate("direction")}>
                        {
                            loadData.map(
                                items => {
                                    if (items.number === foodId) {
                                        return (
                                            <ListItem key={items.number}> {items.direction} </ListItem>
                                        )
                                    }
                                })
                        }
                    </Tab>
                </Tabs>
            </Container>
        </ScrollView>
    );
}



MealDetailScreen.navigationOptions = () => {

    return {
        headerTitle: translate("mealDetail"),

    };
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: Dimensions.get('window').height > 910 ? 300 : 200,
        marginTop: 2,
        justifyContent: 'flex-end'
    },
    details: {
        flexDirection: 'row',
        padding: 13,
        justifyContent: 'space-around'
    },
    listItem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    btnContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 5,

    },
    btnContainerLocal: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: Dimensions.get('window').height > 1200 ? 30 : Dimensions.get('window').height > 910 ? 15 : 10
    },
    btn: {
        borderColor: 'white',
        borderWidth: 2,
        width: Dimensions.get('window').width > 720 ? '80%' : '100%',
        borderRadius: 10,
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: Dimensions.get('window').height > 1200 ? 15 : Dimensions.get('window').height > 910 ? 12 : 5,
    },
    titles: {
        fontFamily: 'segoepr',
        fontSize: Dimensions.get('window').height > 1200 ? 20 : Dimensions.get('window').height > 910 ? 18 : 15,
        textAlign: 'center',
        color: 'white'
    },
    btnClick: {
        borderColor: 'white',
        borderWidth: 2,
        width: Dimensions.get('window').width > 720 ? '80%' : '100%',
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: Dimensions.get('window').height > 1200 ? 15 : Dimensions.get('window').height > 910 ? 12 : 5,
    },
    titleClick: {
        fontFamily: 'segoepr',
        fontSize: Dimensions.get('window').height > 1200 ? 20 : Dimensions.get('window').height > 910 ? 18 : 15,
        textAlign: 'center',
        color: 'black'
    },
    titleContainer: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Dimensions.get('window').height > 1200 ? 27 : Dimensions.get('window').height > 910 ? 35 : 18,
        paddingHorizontal: Dimensions.get('window').height > 1200 ? 12 : Dimensions.get('window').height > 910 ? 10 : 5,
        marginTop: 10,
        marginLeft: Dimensions.get('window').width > 720 ? 300 : Dimensions.get('window').width > 480 ? 300 : Dimensions.get('window').width > 400 ? 180 : 160,
        marginRight: 70,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20
    },
    titleContainerLocal: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Dimensions.get('window').height > 1200 ? 30 : Dimensions.get('window').height > 910 ? 65 : 35,
        paddingHorizontal: Dimensions.get('window').height > 1200 ? 12 : Dimensions.get('window').height > 910 ? 10 : 5,
        marginLeft: Dimensions.get('window').width > 720 ? 350 : Dimensions.get('window').width > 480 ? 350 : Dimensions.get('window').width > 400 ? 200 : 150,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20

    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: Dimensions.get('window').height > 1200 ? 17 : Dimensions.get('window').height > 910 ? 13 : 9,
        color: 'white',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'white',
        padding: 5,
        marginBottom: 5
    },
    titleMeal: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').height > 1200 ? 21 : Dimensions.get('window').height > 910 ? 21 : 17
    },
    txtInfo: {
        fontFamily: 'boyar',
        fontSize: Dimensions.get('window').height > 1200 ? 19 : Dimensions.get('window').height > 910 ? 19 : 15,
    },
    star: {
        margin: 10,
        marginLeft: Dimensions.get('window').width > 480 ? 120 : 0
    },
    favIcon: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        width: Dimensions.get('window').width > 480 ? 60 : 50,
        height: Dimensions.get('window').height > 910 ? 40 : 30,
        marginLeft: 20,
        marginTop: Dimensions.get('window').height > 910 ? 270 : 180,
        paddingLeft: 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    favIconLocal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        width: Dimensions.get('window').width > 480 ? 60 : 50,
        height: Dimensions.get('window').height > 910 ? 40 : 30,
        marginLeft: 20,
        marginTop: Dimensions.get('window').height > 910 ? 260 : 170,
        paddingLeft: 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    compWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default MealDetailScreen;