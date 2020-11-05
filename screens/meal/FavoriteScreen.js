import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { useSelector } from 'react-redux';
import OtherMealList from '../../components/OtherMealList';
import { Container, Tab, Tabs } from 'native-base';
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';

setI18nConfigs();
const FavoriteScreen = props => {
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
    setI18nConfigs();
    const favMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookMeals = useSelector(state => state.cooked.cookedMeals);

    return (
        <Container>
            <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 1 }}>
                <Tab
                    activeTabStyle={{ backgroundColor: 'white' }}
                    tabStyle={{ backgroundColor: 'white' }}
                    textStyle={{
                        color: 'black',
                        fontSize: Dimensions.get('window') > 720 ? 20 : 16
                    }}
                    activeTextStyle={{
                        color: 'black',
                        fontWeight: 'normal',
                        fontSize: Dimensions.get('window') > 720 ? 20 : 16
                    }}
                    heading={translate("youLiked")}>
                    <View style={styles.screen}>
                        <OtherMealList listData={favMeals} navigation={props.navigation} />
                    </View>
                </Tab>
                <Tab activeTabStyle={{ backgroundColor: 'white' }}
                    tabStyle={{ backgroundColor: 'white' }}
                    textStyle={{
                        color: 'black',
                        fontSize: Dimensions.get('window') > 720 ? 24 : 16
                    }}
                    activeTextStyle={{
                        color: 'black',
                        fontWeight: 'normal',
                        fontSize: Dimensions.get('window') > 720 ? 24 : 16
                    }}
                    heading={translate("cookedByYou")}>
                    <View style={styles.screen}>
                        <OtherMealList listData={cookMeals} navigation={props.navigation} />
                    </View>
                </Tab>

            </Tabs>
        </Container>

    );

}


FavoriteScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    return {
        headerTitle: translate("favorites"),
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
export default FavoriteScreen;