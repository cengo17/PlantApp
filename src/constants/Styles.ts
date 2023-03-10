import {useThemeColor} from '../component/Themed';
import {StyleSheet} from 'react-native';

export function Styles() {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: 6,
      height: 50,
      paddingHorizontal: 20,
      borderColor: useThemeColor({}, 'inputBorder'),
      color: useThemeColor({}, 'text'),
    },
  });
}
