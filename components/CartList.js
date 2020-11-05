import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';


const MealList = props => {
    const favoriteMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookedMeals = useSelector(state => state.cooked.cookedMeals);
    const cartedMeals = useSelector(state => state.cart.cartedMeals);



    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.number === itemData.item.number);
        const isCooked = cookedMeals.some(meals => meals.number === itemData.item.number);
        const isCarted = cartedMeals.some(meals => meals.number === itemData.item.number);


        return (
            <CartItem
                title={itemData.item.title}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                ingredients={itemData.item.ingredients}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        foodId: itemData.item.number,
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
                style={{ width: '90%' }} />
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