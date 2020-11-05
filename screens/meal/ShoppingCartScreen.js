import React from 'react';
import { StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { useSelector } from 'react-redux';
import CartList from '../../components/CartList';
import { dataRecipe, setI18nConfig } from '../../Translate/RecipeTranslate';
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';

setI18nConfigs();
setI18nConfig();
let loadData = dataRecipe();
const ShoppingCartScreen = props => {
    setI18nConfig();

    const cartedMeals = useSelector(state => state.cart.cartedMeals);

    return (
        <CartList listData={cartedMeals} navigation={props.navigation} />
    );
}
ShoppingCartScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    return {
        headerTitle: translate("shoppingCart"),
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
    },
    listItem: {
        marginHorizontal: 35,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    image: {
        width: '80%',
        height: 150,
        borderWidth: 1,
        borderRadius: 10
    },
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around'
    },
    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 22,
        textAlign: 'center'
    },
});

export default ShoppingCartScreen;