import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';

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
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mealItem: {
        height: Dimensions.get('window').height > 910 ? 120 : Dimensions.get('window').height > 790 ? 80 : 80,
        width: Dimensions.get('window').width > 720 ? 500 : Dimensions.get('window').width > 480 ? 500 : 350,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10
    },
    bgImage: {
        width: Dimensions.get('window').height > 1200 ? "30%" : '24%',
        height: '100%',
        justifyContent: 'flex-end',
        borderRadius: Dimensions.get('window').height > 1200 ? 80 : 60,
    },

    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '100%',

    },
    titleContainer: {
        paddingVertical: Dimensions.get('window').height > 910 ? 40 : Dimensions.get('window').height > 790 ? 20 : 20,
        paddingHorizontal: 15,
    },
    title: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').height > 910 ? 20 : Dimensions.get('window').height > 790 ? 18 : 15,
        color: 'black',
        marginRight: 120
    },

});

export default MealItem;
