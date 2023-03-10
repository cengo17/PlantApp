import React, {useCallback} from 'react';
import {PressableProps, Pressable} from 'react-native';
import {useState} from 'react';

export interface PressableOpacityProps extends PressableProps {
  disabledOpacity?: number;
  activeOpacity?: number;
  disableAutoLock?: boolean;
  onPress: () => void;
}

export default function PressableOpacity({
  style,
  disabled = false,
  disabledOpacity = 0.3,
  activeOpacity = 0.3,
  ...passThroughProps
}: PressableOpacityProps): React.ReactElement {
  const getOpacity = useCallback(
    (pressed: boolean) => {
      if (disabled) {
        return disabledOpacity;
      } else {
        if (pressed) {
          return activeOpacity;
        } else {
          return 1;
        }
      }
    },
    [activeOpacity, disabled, disabledOpacity],
  );

  const [disable, setDisable] = useState(false);

  const _style = useCallback(
    ({pressed}) => [style, {opacity: getOpacity(pressed)}],
    [getOpacity, style],
  );

  return (
    <Pressable
      style={_style}
      disabled={disable || disabled}
      {...passThroughProps}
      onPress={() => {
        if (passThroughProps.disableAutoLock) {
          passThroughProps.onPress && passThroughProps.onPress();
          return;
        }
        setDisable(true);
        setTimeout(() => {
          setDisable(false);
        }, 1000);
        passThroughProps.onPress && passThroughProps.onPress();
      }}
    />
  );
}
