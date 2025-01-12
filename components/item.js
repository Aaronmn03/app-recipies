import { StyleSheet, View, Text} from 'react-native';
import Activity from './activity.js';

export default function Item({nombreItem, descripcionItem}) {
  return (
    <View>
        <Activity nombreActividad={nombreItem} descripcionActividad={descripcionItem}></Activity>
    </View>
  );
}