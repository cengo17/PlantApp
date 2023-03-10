import React from 'react';
import {View, ViewProps} from 'react-native';
import {useThemeColor} from './Themed';
export interface CustomViewProps extends ViewProps {
  row?: boolean;
  space?: number;
  lineSeparator?: boolean;
  lineSeparatorColor?: string;
  removePadding?: boolean;
}
export default function CView({...props}: CustomViewProps): React.ReactElement {
  const isRow =
    props.row ||
    props.style?.flexDirection === 'row' ||
    props.style?.flexDirection === 'row-reverse';

  let arr: any[] | undefined;

  props.children?.forEach?.((child, index) => {
    if (!child) {
      return null;
    }

    let item = React.cloneElement(child, {
      key: child.key || child.props.placeholder || index + 1,
    });

    if (!arr) {
      arr = [];
    }

    arr.push(item);
    if (props.space && index < props.children.length - 1) {
      arr.push(
        <View
          key={(index + 1) * 999}
          style={{
            height: !isRow ? props.space : undefined,
            width: isRow ? props.space : undefined,
            justifyContent: 'center',
          }}>
          {props.lineSeparator ? (
            <View
              style={{
                height: 1,
                backgroundColor:
                // eslint-disable-next-line react-hooks/rules-of-hooks
                  props.lineSeparatorColor || useThemeColor({}, 'inputBorder'),
              }}
            />
          ) : null}
        </View>,
      );
    }
  });

  return (
    <View
      {...props}
      style={[
        {
          flexDirection: props.row ? 'row' : 'column',
        },
        props.style,
      ]}>
      {arr || props.children}
    </View>
  );
}
