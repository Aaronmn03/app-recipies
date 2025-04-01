import React from 'react';
import { StyleSheet } from 'react-native';
import sizes from '../styles/sizes';
import { ThemedText, ThemedView } from './ThemedComponents';

export default function TitleView({title}) { 
    return (
    <ThemedView style={styles.headerContainer}>
        <ThemedText style={styles.text}>{title}</ThemedText>
    </ThemedView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    text: {
        fontSize: sizes.textSize,
        textAlign: 'center',
        margin: 5,
        fontWeight:'700',
    },
});