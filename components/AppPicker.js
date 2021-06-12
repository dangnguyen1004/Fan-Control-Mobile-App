import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Platform, TouchableWithoutFeedback, Modal, Button, FlatList, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import colors from '../config/color'
import PickerItem from './PickerItem';
import ScreenApp from './ScreenApp';
import color from '../config/color';

function AppPicker({
    icon,
    placeholder,
    items,
    selectedItem,
    onSelectItem,
    width = '100%',
    numberOfColumns = 1,
    PickerItemComponent = PickerItem,
}) {
    const [modalVisible, setModalVisible] = useState(false)
    return (
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={[styles.container, { width }]}>
                    {icon &&
                        <MaterialCommunityIcons
                            name={icon}
                            size={20}
                            color={colors.medium}
                            style={styles.icon}
                        > </MaterialCommunityIcons>}

                    {selectedItem ? (
                        <Text style={styles.text}>{selectedItem.label}</Text>
                    ) : (
                        <Text style={styles.placeholder}>{placeholder}</Text>
                    )}
                    <MaterialCommunityIcons
                        name='chevron-down'
                        size={20}
                        color={colors.medium}
                    > </MaterialCommunityIcons>
                </View>
            </TouchableWithoutFeedback>
            <Modal
                visible={modalVisible}
                animationType='slide'
            >
                <Button title='Close' onPress={() => setModalVisible(false)}> </Button>
                <FlatList
                    data={items}
                    keyExtractor={item => item.value.toString()}
                    numColumns={numberOfColumns}
                    renderItem={({ item }) =>
                        <PickerItemComponent
                            item={item}
                            label={item.label}
                            onPress={() => {
                                setModalVisible(false)
                                onSelectItem(item)
                            }}
                        ></PickerItemComponent>}
                ></FlatList>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 15,
        marginVertical: 10,
    },
    icon: {
        marginRight: 10,
    },
    text: {
        flex: 1,
        fontSize: color.fontSize,
        color: color.medium
    },
    placeholder: {
        color: colors.medium,
        flex: 1,
        fontSize: color.fontSize,
    }
})

export default AppPicker;