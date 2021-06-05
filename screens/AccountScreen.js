import React from 'react';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import AccountItem from '../components/AccountItem';
import AccountItemSeparator from '../components/AccountItemSeparator';
import Icon from '../components/Icon';
import ScreenApp from '../components/ScreenApp';
import color from '../config/color';

const menuItems = [
    {
        title: "Adafruit Account",
        icon: {
            name: 'format-list-bulleted',
            backGroundColor: color.primary,
        }
    },
    {
        title: "Notification",
        icon: {
            name: 'email',
            backGroundColor: color.secondary,
        },
    },
    {
        title: "Password",
        icon: {
            name: 'email',
            backGroundColor: color.secondary,
        },
    },
    {
        title: "Phone",
        icon: {
            name: 'email',
            backGroundColor: color.secondary,
        },
    },
]

function AccountScreen(props) {
    return (
        <ScreenApp style={{
            backgroundColor: color.light
        }}>
            <View style={styles.accountInfo}>
                <Image
                    source={require('../assets/NguyenHaiDang.png')}
                    style={styles.avatar}
                ></Image>
                <View style={styles.infoDetail}>
                    <Text style={styles.email}>Account email</Text>
                    <Text style={styles.name}>Account name</Text>
                </View>
            </View>

            <View style={{
                marginBottom: 30,
            }}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={AccountItemSeparator}
                    renderItem={({ item }) =>
                        <AccountItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} style={styles.icon} backgroundColor={item.icon.backGroundColor} />
                            }
                            onPress={() => console.log(item.title)}
                        ></AccountItem>
                    }
                ></FlatList>
            </View>

            <AccountItem
                IconComponent={
                    <Icon name='logout' size={40} style={styles.icon} backgroundColor={color.danger}></Icon>
                }
                title='Log out'
                onPress={() => console.log('Log out')}
            ></AccountItem>
        </ScreenApp>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.light
    },
    icon: {
        marginLeft: 10,
        marginRight: 10,
    },
    accountInfo: {
        width: '100%',
        backgroundColor: color.white,
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginLeft: 10,
        marginRight: 10,
    },
    email: {
        fontSize: 25,
        fontWeight: 600,
    },
    name: {
        fontSize: color.fontSize,
    }

});

export default AccountScreen;