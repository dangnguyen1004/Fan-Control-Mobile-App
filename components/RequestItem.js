import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RequestAction from './RequestAction';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import color from '../config/color';

function RequestItem({ onAccept, onDeny, item }) {
    return (
        <Swipeable
            renderRightActions={() => <RequestAction
                onAccept={onAccept}
                onDeny={onDeny}
            />}
        >
            <View style={styles.container}>
                <Text style={{ fontSize: color.fontSize }}>{item}</Text>
            </View>
        </Swipeable>);
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
});

export default RequestItem;