import React from 'react';
import { View, StyleSheet } from 'react-native';
import RequestAcceptAction from './RequestAcceptAction';
import RequestDenyAction from './RequestDenyAction';

function RequestAction({ onAccept, onDeny }) {
    return (
        <View style={styles.container}>
            <RequestAcceptAction onPress={onAccept}></RequestAcceptAction>
            <RequestDenyAction onPress={onDeny}></RequestDenyAction>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default RequestAction;