import React, { useEffect, useState } from 'react';
import { Platform, Linking, Dimensions, Text, SafeAreaView, Image, Share, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import CategoriesScreen from '../screens/meal/CategoriesScreen';
import CategoryMealsScreen from '../screens/meal/CategoryMealsScreen';
import MealDetailScreen from '../screens/meal/MealDetailScreen';
import FavoriteScreen from '../screens/meal/FavoriteScreen';
import FoodsScreen from '../screens/meal/FoodsScreen';
import ShoppingCartScreen from '../screens/meal/ShoppingCartScreen';
import NewRecipeScreen from '../screens/meal/NewRecipeScreen';
import SearchScreen from '../screens/meal/SearchScreen';
import { setI18nConfigs, translate } from '../Translate/MenuTranslate';
import DeviceInfo from 'react-native-device-info';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RateAppItem from '../components/RateAppItem';
import { InterstitialAd, AdEventType } from '@react-native-firebase/admob';

setI18nConfigs();
const defaultStackNavOptions = {

    headerStyle: {
        backgroundColor: 'white',
    },
    headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 15
    },
    headerBackTitleStyle: {
        fontFamily: 'OpenSans-Regular'
    },
    headerTintColor: '#000000'


};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoriteScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});
const ShopCartNavigator = createStackNavigator({
    ShoppingCart: ShoppingCartScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});
const NewRecipeNavigator = createStackNavigator({
    NewRecipe: NewRecipeScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const SearchNavigator = createStackNavigator({
    Search: SearchScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const tabScreenConfig = {
    Home: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {

                return (
                    focused ?
                        <Icon
                            name="home"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        /> : <Icon
                            name="home-outline"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        />

                );
            },

            tabBarLabel: translate("home")
        }
    },
    NewRecipe: {
        screen: NewRecipeNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (
                    focused ?
                        <Image source={require('../assets/image/new_box.png')}
                            style={{ width: Dimensions.get('window').width > 480 ? 34 : 24, height: Dimensions.get('window').height > 910 ? 34 : 24 }} /> :
                        <Image source={require('../assets/image/new_outline.png')}
                            style={{ width: Dimensions.get('window').width > 480 ? 34 : 24, height: Dimensions.get('window').height > 910 ? 34 : 24 }} />
                );
            },

            tabBarLabel: translate("news")
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (
                    focused ?
                        <Icon
                            name="heart"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        /> : <Icon
                            name="heart-outline"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        />
                );
            },

            tabBarLabel: translate("favorites")
        }
    },
    ShoppingCart: {
        screen: ShopCartNavigator,
        navigationOptions: {
            tabBarIcon: ({ focused }) => {
                return (
                    focused ?
                        <Icon
                            name="cart"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        /> : <Icon
                            name="cart-outline"
                            size={Dimensions.get('window').height > 910 ? 30 : 20}
                            color='#000000'
                        />
                );
            },

            tabBarLabel: translate("cart")
        }
    }

};

const HomeMealsFavShopTabNavigator = createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        labelStyle: {
            fontFamily: 'OpenSans-Bold',
            color: 'black',
        },
        labelPosition: "below-icon"
    }
});

const FoodNavigator = createStackNavigator({
    Foods: FoodsScreen,
}, {
    defaultNavigationOptions: defaultStackNavOptions
});


const RecipesNavigator = createDrawerNavigator({
    Home: {
        screen: HomeMealsFavShopTabNavigator,
        navigationOptions: {
            drawerLabel: translate("home")
        },
        contentOptions: {
            labelStyle: {
                fontFamily: 'materialdrawerfont-font-v5.0.0'
            }
        }
    },
    Caloricity: {
        screen: FoodNavigator,
        navigationOptions: {
            drawerLabel: translate("caloricity")
        },
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'materialdrawerfont-font-v5.0.0'
            }
        }
    },
    Search: {
        screen: SearchNavigator,
        navigationOptions: {
            drawerLabel: translate("searches")
        },
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'materialdrawerfont-font-v5.0.0',

            }
        }
    }

}, {
    contentComponent: props => {
        setI18nConfigs();
        const [visible, setVisible] = useState(false);
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
        let version = DeviceInfo.getVersion();
        let buildNumber = DeviceInfo.getBuildNumber();
        const supportedURL = "https://play.google.com/store/apps/details?id=mobi.devsteam.propertynutrition";
        const handleClick = () => {
            Linking.canOpenURL(supportedURL).then(supported => {
                if (supported) {
                    Linking.openURL(supportedURL);
                } else {
                    console.log("Don't know how to open URI: " + supportedURL);
                }
            });

        };
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

        const show = () => {
            if (visible) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }
        const showInterstitialAd = () => {
            // Create a new instance
            const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-8323348147242911/3486379634');

            // Add event handlers
            interstitialAd.onAdEvent((type, error) => {
                if (type === AdEventType.LOADED) {
                    interstitialAd.show();
                }
            });

            // Load a new advert
            interstitialAd.load();
        }
        return (
            <View style={{
                flex: 1,
                paddingTop: Dimensions.get("window").height > 720 ? 20 : 5
            }}>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems {...props} />
                    {visible ? <RateAppItem /> : null}

                    <TouchableOpacity style={{
                        marginTop: 10,
                        marginLeft: 15,
                        flexDirection: 'row',
                    }}
                        onPress={() => { show() }}>
                        <Text>{translate("rateIt")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 15,
                        marginLeft: 15,
                        flexDirection: 'row',
                    }}
                        onPress={() => { handleClick() }}>
                        <Icon name="star-outline"
                            size={Dimensions.get("window") > 720 ? 30 : 20}
                        />
                        <Text>{translate("rateApp")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginTop: 15,
                        marginLeft: 15,
                        flexDirection: 'row',
                    }}
                        onPress={() => { showInterstitialAd() }}>
                        <Image source={require('../assets/image/off_ads.png')}
                            style={{ width: Dimensions.get('window').width > 480 ? 34 : 24, height: Dimensions.get('window').height > 910 ? 34 : 24 }} />
                        <Text>{translate("adsFree")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 15, marginLeft: 15, flexDirection: 'row' }}
                        onPress={() => { onShare() }}>
                        <Icon name="share-variant"
                            size={Dimensions.get("window") > 720 ? 30 : 20}
                        />
                        <Text>{translate("share")}</Text>
                    </TouchableOpacity>
                    <Text style={{ marginTop: 20, marginLeft: 20 }}>v{version}({buildNumber})</Text>
                </SafeAreaView>
            </View>
        );
    }

});



export default createAppContainer(RecipesNavigator);