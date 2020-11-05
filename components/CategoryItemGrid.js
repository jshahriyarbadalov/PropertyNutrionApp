import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TouchableNativeFeedback,
    Dimensions,
    Image
} from 'react-native';


const CategoryItemGrid = props => {

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

    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    return (
        <View style={styles.gridItem}>
            <TouchableCmp style={{ flex: 1 }}
                onPress={props.onSelect}>
                {/* <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
                    <Text style={styles.title} numberOfLines={2}>{props.title}</Text>
                </View> */}
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <Image source={{ uri: props.image }} style={styles.bgImage} />
                        <View style={styles.titleContainer}>
                            <Text style={styles.title} numberOfLines={1}>{props.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableCmp>

        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        marginTop: Dimensions.get('window').height > 1200 ? 15 : Dimensions.get('window').height > 720 ? 5 : 10,
        width: Dimensions.get('window').width > 720 ? 130 : Dimensions.get('window').width > 480 ? 130 : 90,
        height: Dimensions.get('window').height > 1200 ? 120 : Dimensions.get('window').height > 910 ? 120 : Dimensions.get('window').height > 790 ? 85 : 85,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',

    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bgImage: {
        width: '60%',
        height: '60%',
        justifyContent: 'flex-end',
        borderRadius: 40,
    },
    mealRow: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealHeader: {
        height: '100%',

    },
    titleContainer: {
        paddingVertical: 5,
        paddingHorizontal: 12,
    },
    title: {
        fontFamily: 'segoepr',
        fontSize: Dimensions.get('window').width > 720 ? 16 : Dimensions.get('window').width > 480 ? 16 : 13,
        color: 'black',
    },
});

export default CategoryItemGrid;
