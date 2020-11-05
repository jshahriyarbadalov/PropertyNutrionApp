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
                            <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                            <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
                                <Text style={{ color: 'gray' }} >{props.ingredients}</Text>
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
        height: Dimensions.get('window').height > 720 ? 320 : 200,
        width: '100%',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10
    },
    bgImage: {
        width: Dimensions.get('window').height > 720 ? '25%' : '21%',
        height: Dimensions.get('window').height > 720 ? '37%' : '33%',
        justifyContent: 'flex-end',
        borderRadius: Dimensions.get('window').height > 720 ? 60 : 40
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '100%',
    },
    mealDetail: {
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: Dimensions.get('window').height > 720 ? 18 : 12,
        color: 'black',
        fontFamily: 'OpenSans-Regular'
    },
    titleContainer: {
        paddingHorizontal: 5,
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: Dimensions.get('window').height > 720 ? 20 : 15,
        color: 'black',
    },
});

export default MealItem;
