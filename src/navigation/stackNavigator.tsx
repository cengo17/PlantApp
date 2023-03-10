import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Tabbar from '../navigation/BottomTab';
import {navigationRef} from './NavigationServices';
import GetStarted from '../component/GetStarted/getStarted';
import OnBoarding from '../component/OnBoarding/OnBoarding';
import Paywall from '../component/Paywall/Paywall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="Paywall" component={Paywall} />
      <Stack.Screen name="Tabbar" component={Tabbar} />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Tabbar" component={Tabbar} />
    </Stack.Navigator>
  );
};

const AppNavigationContainer = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  const checkAppLaunched = async () => {
    const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    setIsAppFirstLaunched(appData === null);
    await AsyncStorage.setItem('isAppFirstLaunched', 'false');
  };

  useEffect(() => {
    checkAppLaunched();
  }, []);

  if (isAppFirstLaunched === null) {
    return null;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {isAppFirstLaunched ? <LoginStack /> : <HomeStack />}
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
