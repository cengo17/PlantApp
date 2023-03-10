import {TextStyle} from 'react-native';
import {useThemeColor} from './Themed';
import React from 'react';
import CText from './CustomText';
import PressableOpacity from './PressableOpacity';
import {PressableOpacityProps} from './PressableOpacity';
import {useEffect, useState} from 'react';

export interface CustomButtonProps extends PressableOpacityProps {
  text: string;
  outline?: boolean;
  textColor?: string;
  backgroundColor?: string;
  textStyle?: TextStyle;
}
export default function CButton({
  ...props
}: CustomButtonProps): React.ReactElement {
  const [defaultButtonColor, setDefaultButtonColor] = useState(
    useThemeColor({}, 'defaultButton'),
  );
  const [defaultTextColor, setDefaultTextColor] = useState(
    useThemeColor({}, 'defaultButtonText'),
  );

  useEffect(() => {}, []);

  return (
    <PressableOpacity
      {...props}
      style={[
        {
          height: 50,
          backgroundColor:'#28AF6E',
          borderRadius: 12,
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: props.outline ? 1 : 0,
          borderColor: defaultButtonColor,
        },
        props.style,
      ]}>
      <CText
        style={[
          {
            color: props.outline
              ? defaultButtonColor
              : props.textColor || defaultTextColor,
            marginHorizontal: 20,
          },
          props.textStyle,
        ]}
        fontSize={15}
        semiBold>
        {props.text}
      </CText>
    </PressableOpacity>
  );
}
