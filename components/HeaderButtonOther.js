import React, { useEffect, useState } from 'react';
import { Platform, Dimensions } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomHeaderButton = props => {
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
    return (
        <HeaderButton
            {...props}
            IconComponent={Icon}
            iconSize={Dimensions.get('window').height > 1200 ? 30 : Dimensions.get('window').height > 910 ? 30 : 20}
            color='#b3b3b3'
        />
    );
}

export default CustomHeaderButton;