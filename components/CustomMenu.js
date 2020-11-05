import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from './HeaderButtonSort';

export default class CustomMenu extends Component {
    _menu = null;
    setMenuRef = ref => {
        this._menu = ref;
    };
    showMenu = () => {
        this._menu.show();
    };
    hideMenu = () => {
        this._menu.hide();
    };
    option1Click = () => {
        this._menu.hide();
        this.props.option1Click();
    };
    option2Click = () => {
        this._menu.hide();
        this.props.option2Click();
    };
    render() {
        return (
            <View style={this.props.menustyle}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <View style={styles.sorted}>
                            <Text style={this.props.textStyle}>
                                {this.props.menutext}
                            </Text>
                            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item title="Sort" iconName="sort-down" onPress={this.showMenu} />
                            </HeaderButtons>
                        </View>
                    }>
                    <MenuItem onPress={this.option1Click}>Sort A to Z</MenuItem>
                    <MenuItem onPress={this.option2Click}>Sort Z to A</MenuItem>
                </Menu>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sorted: {
        flexDirection: 'row'
    }
});