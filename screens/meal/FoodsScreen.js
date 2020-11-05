import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import { DataTable } from 'react-native-paper';
import { dataCalorie, setI18nConfig } from '../../Translate/KcalTranslate';
import * as RNLocalize from "react-native-localize";
import { setI18nConfigs, translate } from '../../Translate/MenuTranslate';

setI18nConfigs();
setI18nConfig();
let calorieData = dataCalorie();

// const ListItem = (itemData) => {

//     return (
//         < View style={styles.listItem} >
//             <View style={styles.titleContainer}>
//                 <Text style={styles.title}>{itemData.item.name}</Text>
//             </View>
//             <View style={styles.details}>
//                 <Text style={styles.titleDetails}>Protein: {itemData.item.protein} gr</Text>
//                 <Text style={styles.titleDetails}>Fat: {itemData.item.fat} gr</Text>
//                 <Text style={styles.titleDetails}>Carbo: {itemData.item.carbo} gr</Text>
//                 <Text style={styles.titleDetails}>Kcal: {itemData.item.kcal} gr</Text>
//             </View>
//         </View >
//     )
// }

const FoodsScreen = props => {
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
    const handleLocalizationChange = () => {
        setI18nConfig();
    };

    useEffect(() => {
        RNLocalize.addEventListener("change", handleLocalizationChange());
    });
    useEffect(() => {
        RNLocalize.removeEventListener("change", handleLocalizationChange());
    });

    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(0);
    const sortedItems = calorieData
        .slice()
        .sort((item1, item2) =>
            (sortAscending
                ? item1.name < item2.name
                : item2.name < item1.name)
                ? 1
                : -1
        );
    const itemsPerPage = Dimensions.get('window').height > 720 ? 15 : 10;
    const from = page * itemsPerPage;
    const to = (page + 1) * itemsPerPage;



    return (
        // <View >
        //     <FlatList
        //         keyExtractor={(item, index) => item.name}
        //         data={calorieData}
        //         renderItem={ListItem}
        //     />
        // </View>
        <ScrollView style={[styles.container]}
            contentContainerStyle={styles.content}>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title
                        sortDirection={sortAscending ? 'ascending' : 'descending'}
                        onPress={() => setSortAscending(!sortAscending)}
                        style={styles.title}>Products for 100 g</DataTable.Title>
                    <DataTable.Title numeric>Protein</DataTable.Title>
                    <DataTable.Title numeric>Fat</DataTable.Title>
                    <DataTable.Title numeric>Carbo</DataTable.Title>
                    <DataTable.Title numeric>Kcal</DataTable.Title>
                </DataTable.Header>
                {calorieData.slice(from, to).map(item => (
                    < DataTable.Row key={item.name}>
                        <DataTable.Cell style={styles.titleDetails}>{item.name}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.protein}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.carbo}</DataTable.Cell>
                        <DataTable.Cell numeric>{item.kcal}</DataTable.Cell>
                    </DataTable.Row>
                ))}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.floor(sortedItems.length / itemsPerPage)}
                    onPageChange={page => setPage(page)}
                    label={`${from + 1}-${to} of ${sortedItems.length}`}
                />
            </DataTable>
        </ScrollView>


    );
}


FoodsScreen.navigationOptions = (navData) => {
    setI18nConfigs();
    return {
        headerTitle: translate("caloricity"),
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
        alignItems: 'center',
        width: '100%',

    },
    container: {
        flex: 1,
        width: '100%',
    },

    content: {
        padding: 8,
        width: '100%',
    },
    first: {
        flex: 2
    },
    listItem: {
        marginVertical: 20,
        marginHorizontal: 20,
        borderColor: '#4a148c',
        backgroundColor: '#ff9900',
        borderWidth: 3,
        padding: 15,
        borderRadius: 10,
        width: '90%',
        height: Dimensions.get("window").height > 720 ? 240 : 185,
    },
    title: {
        flex: 2,
        fontFamily: 'OpenSans-Bold',
        fontSize: Dimensions.get("window").height > 720 ? 24 : 13,
        color: 'white',
        textAlign: 'center'
    },
    titleContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 10
    },
    details: {
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: Dimensions.get("window").height > 720 ? "75%" : '65%'
    },
    titleDetails: {
        flex: 2,
        fontFamily: 'OpenSans-Regular',
        fontSize: 10,
        color: '#f2f2f2',
        textAlign: 'center'
    },
    btnView: {
        flex: 1,
        justifyContent: 'center',
        width: '30%',
        borderRadius: 10
    },



});

export default FoodsScreen;