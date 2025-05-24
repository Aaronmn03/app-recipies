import React from 'react';
import { StyleSheet, View } from 'react-native';
import FloatingAlert from '../components/Modals/FloatingAlert';
import { ThemedText, ThemedView } from '../components/ThemedComponents';
import TitleView from '../components/TitleView';


export default function Calendar() {
  
  return (
    <ThemedView style={styles.container}>
      <FloatingAlert/>
      <TitleView title={'CALENDARIO'} />
      
      <View style={{flex:1,marginTop:40, alignItems:'center'}}>
      </View>
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
