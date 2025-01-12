import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <Header style={styles.header} />
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <Footer color={0}/>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  content: {
    flex: 1,
    marginBottom: 60,
  },
});