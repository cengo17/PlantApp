import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import store from './src/store/store';
import Navigation from './src/navigation/stackNavigator';
export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
