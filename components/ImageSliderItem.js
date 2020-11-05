import React, { useEffect, useState } from 'react';
import {
    View, StyleSheet, Image, Dimensions,
    Text, Platform, TouchableOpacity, ImageBackground
} from 'react-native';
import { setI18nConfigs, translate } from '../Translate/MenuTranslate'
import StarRating from 'react-native-star-rating';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButton';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

setI18nConfigs();
const ImageSliderItem = (props) => {
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
    setI18nConfigs();
    return (
        <ImageBackground source={{ uri: props.bgImage }} style={styles.fullImage}>
            <TouchableOpacity onPress={props.onSelectItem}>
                <View style={styles.container}>
                    <Image source={{ uri: props.image }} style={styles.bgImage} />
                    <View style={styles.txtContainer}>
                        <Text style={styles.title} numberOfLines={3}>{props.title}</Text>
                        <View style={styles.star}>
                            <StarRating
                                disabled={false}
                                emptyStar={'star-outline'}
                                fullStar={'star'}
                                halfStar={'star-half'}
                                iconSet={'MaterialCommunityIcons'}
                                maxStars={5}
                                rating={props.rating}
                                fullStarColor={'orange'}
                                starSize={Dimensions.get('window').width > 480 ? 20 : 15}
                            />
                            <Text style={styles.starNum}>{props.count}</Text>
                        </View>
                        <Text style={styles.txtInfo} numberOfLines={3}>{translate('ingredients')}:{props.ingredients}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View>
                <TouchableNativeFeedback style={styles.searchTitle} onPress={props.onSearchItem}>
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item iconName={Platform.OS === 'android' ? "md-search" : "ios-search"} />
                    </HeaderButtons>
                    <Text style={styles.btnTxt}>{translate('searchBtn')}</Text>
                </TouchableNativeFeedback>
            </View>
        </ImageBackground >
    );

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'floralwhite',
        borderRadius: 15,
        height: Dimensions.get('window').height > 910 ? 200 : Dimensions.get('window').height > 790 ? 150 : 150,
        width: Dimensions.get('window').width > 480 ? 500 : Dimensions.get('window').width > 400 ? 350 : 320,
        padding: 15,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: Dimensions.get('window').width > 480 ? 40 : Dimensions.get('window').width > 400 ? 30 : 20,
        flexDirection: 'row'
    },
    bgImage: {
        width: '35%',
        height: '80%',
        justifyContent: 'flex-end',
        borderRadius: 10,
        marginTop: 10

    },
    title: {
        fontFamily: 'boyar',
        fontSize: Dimensions.get('window').width > 480 ? 25 : 15,
        marginRight: 15,
    },
    txtContainer: {
        flexDirection: 'column',
        marginRight: 10,
        paddingTop: 10,
        paddingLeft: 15,
        marginRight: 130,
        paddingBottom: 20
    },
    txtInfo: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').width > 480 ? 15 : 10,
        marginRight: 3
    },
    star: {
        fontFamily: 'boyar',
        flexDirection: 'row',
        marginTop: 5,

    },
    starNum: {
        marginLeft: 5,
        fontSize: Dimensions.get('window').width > 480 ? 17 : 12
    },
    fullImage: {
        height: '100%',
        width: '100%'
    },
    searchTitle: {
        marginLeft: Dimensions.get('window').width > 480 ? 70 : Dimensions.get('window').width > 400 ? 50 : 40,
        marginRight: Dimensions.get('window').width > 400 ? 90 : 85,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        flexDirection: 'row'
    },
    btnTxt: {
        fontFamily: 'boyar',
        fontSize: Dimensions.get('window').width > 480 ? 20 : 15,
        textAlign: 'center',
        color: '#ccc'
    }

});

export default ImageSliderItem;