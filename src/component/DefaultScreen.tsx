import React from 'react';
import {
  ViewStyle,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {
  NativeSafeAreaViewProps,
  SafeAreaView,
} from 'react-native-safe-area-context';
import CView, {CustomViewProps} from './CustomView';
import {useUIState} from '../hookstate/UIState';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CButton from './CustomButton';

export interface DefaultScreenProps extends NativeSafeAreaViewProps {
  type?: 'empty';
  title?: string;
  subtitle?: string;
  onBackPress?: () => void;
  headerContent?: any;
  ignoreSafeArea?: boolean;
  removePadding?: boolean;
  containerProps?: CustomViewProps;
  containerStyle?: ViewStyle;
  hasBottomNavigation?: boolean;
  scrollableContent?: boolean;
  buttonText?: string;
  onButtonPress?: () => void;
  onClosePress?: () => void;
  buttonDisabled?: boolean;
}

const DefaultScreen = (props: DefaultScreenProps) => {
  //const navigation = useNavigation();
  const uiState = useUIState();
  const insets = useSafeAreaInsets();

  return (
    <ImageBackground
      source={require('../images/Background.png')}
      style={{
        flex: 1,

      }}>
      <SafeAreaView
        edges={
          props.edges ||
          (props.ignoreSafeArea
            ? ['left', 'right']
            : props.hasBottomNavigation || props.scrollableContent
            ? ['left', 'right', 'top']
            : ['bottom', 'left', 'right', 'top'])
        }
        {...props}
        style={[
          {
            flex: 1,
            paddingHorizontal: props.removePadding ? 0 : 30,
            paddingTop: props.removePadding ? 0 : 5,
            paddingBottom: props.removePadding
              ? 0
              : props.scrollableContent
              ? 0
              : props.hasBottomNavigation
              ? uiState.tabBarHeight + 20
              : insets.bottom
              ? 0
              : 20,
          },
          props.style,
        ]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
          keyboardVerticalOffset={0}>
          {props.scrollableContent ? (
            <CView style={{flex: 1}}>
              <ScrollView
                keyboardShouldPersistTaps={'handled'}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingBottom: props.hasBottomNavigation
                    ? uiState.tabBarHeight + 20
                    : insets.bottom || 20,
                }}
                style={[
                  {marginTop: props.removePadding ? 0 : 20, flex: 1},
                  props.containerStyle,
                ]}>
                <CView {...props.containerProps} style={{}}>
                  {props.children}
                </CView>
              </ScrollView>
              {props.onButtonPress ? (
                <CButton
                  disabled={props.buttonDisabled}
                  text={props.buttonText || ''}
                  onPress={() => {
                    Keyboard.dismiss();
                    props.onButtonPress?.();
                  }}
                  style={{
                    marginBottom: props.hasBottomNavigation
                      ? uiState.tabBarHeight + 20
                      : insets.bottom || 20,
                  }}
                />
              ) : null}
            </CView>
          ) : (
            <CView style={{flex: 1}}>
              <CView
                {...props.containerProps}
                style={[
                  {
                    marginTop: props.removePadding ? 0 : 20,
                    flex: 1,
                    overflow: 'hidden',
                  },
                  props.containerStyle,
                ]}>
                {props.children}
              </CView>
              {props.onButtonPress ? (
                <CButton
                  disabled={props.buttonDisabled}
                  text={props.buttonText || ''}
                  onPress={() => {
                    props.onButtonPress?.();
                  }}
                />
              ) : null}
            </CView>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default DefaultScreen;
