import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import StarRating from 'react-native-star-rating';

const RateStar = (props) => {

    return (
        <View style={styles.star}>
            <StarRating
                disabled={false}
                emptyStar={'star-outline'}
                fullStar={'star'}
                halfStar={'star-half'}
                iconSet={'MaterialCommunityIcons'}
                maxStars={5}
                rating={props.starRate}
                //selectedStar={props.onStarPress}
                fullStarColor={'orange'}
                starSize={20}
            />
            <Text style={styles.starNum}>{props.starTitle}</Text>
        </View>
    );
};

export default RateStar;

const styles = StyleSheet.create({
    star: {
        fontFamily: 'boyar',
        flexDirection: 'row',
        marginLeft: 120,
        marginRight: 80
    },
    starNum: {
        marginLeft: 10
    }
});