import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import { setI18nConfigs, translate } from '../Translate/MenuTranslate';

setI18nConfigs();
const MealItem = props => {
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


    return (
        <View style={styles.mealItem}>
            <TouchableOpacity onPress={props.onSelectMeal}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <Image source={{ uri: props.image }} style={styles.bgImage} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={3}>{props.title}</Text>
                            <View style={styles.star}>
                                <StarRating
                                    disabled={false}
                                    emptyStar={'star-outline'}
                                    fullStar={'star'}
                                    halfStar={'star-half'}
                                    iconSet={'MaterialCommunityIcons'}
                                    maxStars={5}
                                    rating={props.starRate}
                                    fullStarColor={'orange'}
                                    starSize={15}
                                />
                                <Text style={styles.starNum}>{props.starCount}</Text>
                            </View>
                            <Text style={styles.txtMeal} numberOfLines={4}> {translate("ingredients")}:{props.ingredients}</Text>
                        </View>

                    </View>

                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: Dimensions.get('window').height > 1200 ? 150 : 100,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10
    },
    bgImage: {
        width: '30%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: 10
    },

    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '100%',

    },
    titleContainer: {
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').height > 1200 ? 20 : 15,
        color: 'black',
    },
    txtMeal: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').height > 1200 ? 15 : 10,
        color: 'gray',
        marginRight: 10
    },
    star: {
        fontFamily: 'boyar',
        flexDirection: 'row',
        marginLeft: 10,

    },
    starNum: {
        marginLeft: 5,
        fontSize: 12
    }
});

export default MealItem;
