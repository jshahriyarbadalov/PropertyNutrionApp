import React, { Fragment, useEffect, useState } from 'react';
import { AppState, Platform, StatusBar, View, Text, StyleSheet } from 'react-native';
import RecipeNavigator from './navigation/RecipeNavigator';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import recipesReducers from './store/reducer/recipes';
import cartrecipeReducers from './store/reducer/cartrecipe';
import cookedrecipeReducers from './store/reducer/cookedrecipe';
import AsyncStorage from '@react-native-community/async-storage'
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import NetInfo from "@react-native-community/netinfo";
import AdMobBanner from './components/AdMobBanner';
import { getNotification } from './components/PushNotificationManager';
import { setI18nConfig, dataNewRecipe } from './Translate/NewTranslate';
import { setI18nConfigs, translate } from './Translate/MenuTranslate';

setI18nConfigs();
setI18nConfig();
let dataRecip = dataNewRecipe();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['navigation']
}

const rootReducer = combineReducers({
  recipe: recipesReducers,
  cart: cartrecipeReducers,
  cooked: cookedrecipeReducers,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

const App = () => {
  const [adsVisible, setAdsVisible] = useState(false);
  const [adNotLoad, setAdNotLoad] = useState(true);
  let count = dataRecip.length;
  const checkNet = () => {
    NetInfo.addEventListener(items => {
      //console.log("Connection type", items.type);
      // console.log("Is connected?", items.isConnected);
      if (items.isConnected === true) {
        setAdsVisible(true)
        setAdNotLoad(true);
      } else {
        setAdsVisible(false)
      }
    });

  }

  useEffect(() => {
    checkNet();
  });

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);
  const _handleAppStateChange = nextAppState => {
    setI18nConfigs();

    if (appState.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");

    } else if (nextAppState === "background") {
      dataRecip.map((item, index) => {
        if (index === count) {
          getNotification(item.title, translate("tastyNot"));
        }
      })
    }
    setAppState(nextAppState);
  };


  return (
    <Fragment>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <RecipeNavigator />
          {adsVisible ?
            <AdMobBanner />
            : null
          }
        </PersistGate>
      </Provider>
    </Fragment>
  );
};


const styles = StyleSheet.create({
  adsBanner: {
    marginBottom: 0,
    marginLeft: 1,
    marginRight: 2
  },
  modalStyle: {
    marginBottom: 0,
    marginLeft: 1,
    marginRight: 2
  },



});
export default App;
