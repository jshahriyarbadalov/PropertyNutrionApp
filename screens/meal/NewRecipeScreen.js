import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import NewMealItem from '../../components/NewMealItem';
import { useSelector } from 'react-redux';
import { setI18nConfig, dataNewRecipe } from '../../Translate/NewTranslate';
import * as RNLocalize from "react-native-localize";
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';

setI18nConfigs();
setI18nConfig();
let dataNew = dataNewRecipe();
const NewRecipeScreen = props => {
    const favoriteMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookedMeals = useSelector(state => state.cooked.cookedMeals);
    const cartedMeals = useSelector(state => state.cart.cartedMeals);
    const handleLocalizationChange = () => {
        setI18nConfig();
    };

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange());
    });
    useEffect(() => {
        RNLocalize.removeEventListener("change", handleLocalizationChange());
    });
    const renderGridItem = (itemData) => {
        const isFavorite = favoriteMeals.some(meal => meal.number === itemData.item.number);
        const isCooked = cookedMeals.some(meals => meals.number === itemData.item.number);
        const isCarted = cartedMeals.some(meals => meals.number === itemData.item.number);
        return (
            <NewMealItem
                title={itemData.item.title}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                starRate={itemData.item.news}
                starCount={itemData.item.news}
                ingredients={itemData.item.ingredients}
                onSelectMeal={() => {
                    props.navigation.navigate('MealDetail', {
                        foodId: itemData.item.number,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite,
                        isCook: isCooked,
                        isCart: isCarted,
                    });
                }}
            />

        );
    }
    return (
        <View>
            <FlatList keyExtractor={(item, index) => item.category}
                data={dataNew}
                renderItem={renderGridItem}
                numColumns={2}
            />
        </View>
    );
}
NewRecipeScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    return {
        headerTitle: translate("newMeals"),
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName="ios-menu" onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>)
    };
};



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }
});

export default NewRecipeScreen;