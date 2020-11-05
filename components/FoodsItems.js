import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import StarRating from 'react-native-star-rating';

const FoodsItems = props => {
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
                            <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
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
                                    starSize={12}
                                />
                                <Text style={styles.starNum}>{props.starCount}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: Dimensions.get('window').height > 1200 ? 180 : Dimensions.get('window').height > 720 ? 190 : 150,
        width: Dimensions.get('window').width > 720 ? 130 : Dimensions.get('window').width > 480 ? 140 : 100,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
    },
    bgImage: {
        width: '90%',
        height: '50%',
        justifyContent: 'flex-end',
        borderRadius: 10
    },

    mealRow: {
        flexDirection: 'column'
    },
    mealHeader: {
        height: '100%',

    },
    titleContainer: {
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'boyar',
        fontSize: 14,
        color: 'black',
    },
    star: {
        fontFamily: 'boyar',
        flexDirection: 'row',

    },
    starNum: {
        marginLeft: 5,
        fontSize: 10
    }
});

export default FoodsItems;
