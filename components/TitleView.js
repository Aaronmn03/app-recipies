import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import BackButton from '../components/BackButton';
import sizes from '../styles/sizes';

export default function TitleView({title}) { 
    return (
    <View style={styles.headerContainer}>
        <BackButton />
        <Text style={styles.text}>{title}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderColor: colors.secondary,
    },
    text: {
        color: colors.secondary,
        fontSize: sizes.textSize,
        textAlign: 'center',
        margin: 5,
    },
});