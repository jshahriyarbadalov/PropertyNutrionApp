import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import OtherMealItem from './OtherMealItem';
import { useSelector } from 'react-redux';


const MealList = props => {
    const favoriteMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookedMeals = useSelector(state => state.cooked.cookedMeals);
    const cartedMeals = useSelector(state => state.cart.cartedMeals);
    //console.log("hello1", cookedMeals)


    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.number === itemData.item.number);
        const isCooked = cookedMeals.some(meals => meals.number === itemData.item.number);
        const isCarted = cartedMeals.some(meals => meals.number === itemData.item.number);
        //console.log("hello2", isCooked)

        return (
            <OtherMealItem
                title={itemData.item.title}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        foodId: itemData.item.number,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite,
                        isCook: isCooked,
                        isCart: isCarted,
                    });
                }} />
        );
    }

    return (
        <View style={styles.list}>
            <FlatList data={props.listData}
                keyExtractor={(item, index) => item.category}
                renderItem={renderMealItem}
                style={{ width: '75%' }} />
        </View>
    );
}
const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    },
});

export default MealList;