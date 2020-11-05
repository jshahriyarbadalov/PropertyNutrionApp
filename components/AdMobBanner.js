import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TestIds, BannerAd, BannerAdSize } from '@react-native-firebase/admob';


const adUnitId = __DEV__ ? 'ca-app-pub-8323348147242911/6112542979' : TestIds.BANNER;

const AdMobBanner = () => {
    const [adNotLoad, setAdNotLoad] = useState(false);
    if (adNotLoad) {
        return (
            <View >
                <Text style={styles.errors}>Ads don't load!</Text>
            </View>);
    }
    return (
        <View style={styles.adsBanner} >

            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.SMART_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdLoaded={() => {
                    console.log('Advert loaded');
                    setAdNotLoad(false)
                }}
                onAdFailedToLoad={(error) => {
                    // console.error('Advert failed to load: ', error);

                    setAdNotLoad(true)
                }}

            />


        </View >
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
    vErro: {
        margin: 5
    },
    errors: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 9

    }
});

export default AdMobBanner;