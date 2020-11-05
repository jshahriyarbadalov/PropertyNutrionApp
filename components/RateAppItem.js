import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Share, Modal } from 'react-native';
import Rate, { AndroidMarket } from 'react-native-rate'
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { setI18nConfigs, translate } from '../Translate/MenuTranslate';

setI18nConfigs();
const RateAppItem = () => {
    const [rated, setRated] = useState(false);
    const [modalVisible, setModalVisible] = useState(true);
    setI18nConfigs();


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
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Share with friend',
                message: 'Look, recipes for world meals!   https://play.google.com/store/apps/details?id=mobi.devsteam.propertynutrition',
                url: 'https://play.google.com/store/apps/details?id=mobi.devsteam.propertynutrition'

            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    setModalVisible(false)
                } else {
                    // shared
                    setModalVisible(false)
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible} >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.appname}>
                        <Image source={require('../assets/image/logo.png')} style={{ width: 50, height: 50 }} />
                        <Text style={styles.title}>Property Nutrition</Text>
                    </View>
                    <Text style={styles.modalText}>
                        {translate("modalMessage")}
                    </Text>
                    <View style={styles.btnContainer}>
                        <View style={styles.btnTitle}>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                const options = {
                                    GooglePackageName: "mobi.devsteam.propertynutrition",
                                    AmazonPackageName: "mobi.devsteam.propertynutrition",
                                    OtherAndroidURL: "https://play.google.com/store/apps/dev?id=8859801872661469682",
                                    preferredAndroidMarket: AndroidMarket.Google,
                                    preferInApp: false,
                                    openAppStoreIfInAppFails: true,
                                    fallbackPlatformURL: "https://devsteam.mobi/#portfolio",
                                }
                                Rate.rate(options, success => {
                                    if (success) {
                                        // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                                        setRated(true)
                                        setModalVisible(false);
                                    }
                                })
                            }} >
                                <Icon name="star-outline"
                                    size={Dimensions.get("window") > 720 ? 30 : 20}
                                    color='white'
                                    style={{ padding: 5 }}
                                />

                            </TouchableOpacity>
                            <Text style={styles.btnTxt}>{translate("rateIt")}</Text>
                        </View>
                        <View style={styles.btnTitle}>
                            <TouchableOpacity style={styles.btn} onPress={() => { onShare() }} >
                                <Icon name="share-variant"
                                    size={Dimensions.get("window") > 720 ? 30 : 20}
                                    color='white'
                                    style={{ padding: 5 }}
                                />

                            </TouchableOpacity>
                            <Text style={styles.btnTxt}>{translate("share")}</Text>
                        </View>
                        <View style={styles.btnTitle}>
                            <TouchableOpacity style={styles.btn} onPress={() => { setModalVisible(false) }} >
                                <Icon name="exit-to-app"
                                    size={Dimensions.get("window") > 720 ? 30 : 20}
                                    color='white'
                                    style={{ padding: 5 }}
                                />
                            </TouchableOpacity>
                            <Text style={styles.btnTxt}>{translate("exit")}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>

    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: Dimensions.get('window').width > 480 ? 20 : 40
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    btnContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    btn: {
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: Colors.primaryColor,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',

    },
    btnTxt: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').width > 480 ? 15 : 13
    },

    title: {
        fontFamily: 'OpenSans-Bold',
        fontSize: Dimensions.get('window').width > 480 ? 15 : 13
    },
    appname: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    modalText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: Dimensions.get('window').width > 480 ? 14 : 13,
        alignItems: 'center',
    },
    btnTitle: {
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
});
export default RateAppItem;