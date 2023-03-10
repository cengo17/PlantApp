import React from 'react';
import {TextProps, Text} from 'react-native';
import Colors from '../constants/Colors';
import {useThemeColor} from './Themed';
import Fonts from '../constants/Fonts';

type Keys = keyof typeof Fonts;
type Values = (typeof Fonts)[Keys];

export interface CustomTextProps extends TextProps {
  subtitle?: boolean;
  color?: keyof typeof Colors.light;
  bold?: boolean;
  semiBold?: boolean;
  fontSize?: number;
  fontFamily?: Values;
}
const CText = React.memo(({...props}: CustomTextProps): React.ReactElement => {
  const color =
    useThemeColor(
      {},
      props.color ||
        props?.style?.color ||
        (props.subtitle ? 'subtitle' : 'text'),
    ) ||
    props.color ||
    props?.style?.color;
  return (
    <Text
      {...props}
      style={[
        {
          color: color,
          fontFamily:
            props.fontFamily ||
            (props.bold
              ? Fonts.bold
              : props.semiBold
              ? Fonts.semiBold
              : Fonts.regular),
          fontSize: props.fontSize || (props.subtitle ? 12 : 14),
        },
        props.style,
      ]}>
      {props.children}
    </Text>
  );
});

export default CText;
