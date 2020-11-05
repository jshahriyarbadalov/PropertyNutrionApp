import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ImageSliderItem from './ImageSliderItem';
import { useSelector } from 'react-redux';


const ImageSliderList = (props) => {
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

    const [activeIndex, setActiveIndex] = useState(0);

    const favoriteMeals = useSelector(state => state.recipe.favoriteMeals);
    const cookedMeals = useSelector(state => state.cooked.cookedMeals);
    const cartedMeals = useSelector(state => state.cart.cartedMeals);

    const renderItem = (itemData) => {

        const isFavorite = favoriteMeals.some(meal => meal.number === itemData.item.number);
        const isCooked = cookedMeals.some(meals => meals.number === itemData.item.number);
        const isCarted = cartedMeals.some(meals => meals.number === itemData.item.number);
        return (
            <ImageSliderItem
                bgImage={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                image={'https://proper-nutrition.exyte.top/Data/en/images/img' + itemData.item.number + '.jpg'}
                title={itemData.item.title}
                rating={itemData.item.news}
                count={itemData.item.news}
                ingredients={itemData.item.ingredients}
                onSelectItem={() => {
                    props.navigation.navigate('MealDetail', {
                        foodId: itemData.item.number,
                        mealTitle: itemData.item.title,
                        isFav: isFavorite,
                        isCook: isCooked,
                        isCart: isCarted,
                    });
                }}
                onSearchItem={() => {
                    props.navigation.navigate("Search");
                }}
            />
        );
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                <Carousel
                    layout={"default"}
                    ref={ref => carousel = ref}
                    data={props.listItemData}
                    sliderWidth={400}
                    itemWidth={Dimensions.get('window').width > 480 ? 600 : Dimensions.get('window').width > 400 ? 450 : 400}
                    renderItem={renderItem}
                    onSnapToItem={index => setActiveIndex(index)} />
            </View>
        </SafeAreaView>
    );
};

export default ImageSliderList;