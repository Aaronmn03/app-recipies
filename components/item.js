import {View, TouchableOpacity} from 'react-native';
import Activity from './activity.js';

export default function Item({nombreItem, descripcionItem, funcion}) {
  return (
    <View>
        <TouchableOpacity onPress={funcion}>
          <Activity nombreActividad={nombreItem} descripcionActividad={descripcionItem}></Activity>
        </TouchableOpacity>
    </View>
  );
}