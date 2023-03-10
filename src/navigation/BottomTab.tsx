import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../component/HomePage/HomePage';

const MainStackScreen = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
        swipeEnabled: false,
      }}
      gestureHandlerProps={{
        maxPointers: 1,
        swipeEnabled: false,
      }}
      navigationOptions={{
        cardStack: {
          gesturesEnabled: false,
          swipeEnabled: false,
        },
      }}
      options={{
        gestureEnabled: false,
      }}
      initialRouteName="Login">
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="HomePage"
        component={HomePage}
      />
    </StackNavigator.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="GetStarted"
      screenOptions={({route}) => ({
        safeAreaInset: {bottom: 'never', top: 'never'}, // <-- this is the solution
        labelStyle: {
          fontSize: RFPercentage(1.6),
        },
        tabStyle: {
          fontSize: RFPercentage(1.6),
        },
        tabBarActiveTintColor: '#28AF6E',
        tabBarInactiveTintColor: 'gray',
        style: {
          elevation: 0,
          backgroundColor: '#f2f2f2',
          borderBottomColor: '#f2f2f2',
          ...styles.shadow,
        },
        tabBarStyle: {backgroundColor: '#fff', height: 90},
        header: () => null,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = focused
                ? require('../images/Tb.png')
                : require('../images/Tb.png');
              break;
            case 'Diagnose':
              iconName = focused
                ? require('../images/Tb3.png')
                : require('../images/Tb3.png');
              break;
            case 'Label':
              iconName = focused
                ? require('../images/Tb2.png')
                : require('../images/Tb2.png');
              break;
            case 'My Garden':
              iconName = focused
                ? require('../images/Tb4.png')
                : require('../images/Tb4.png');
              break;
            case 'Profile':
              iconName = focused
                ? require('../images/profile.png')
                : require('../images/profile.png');
              break;
            default:
              iconName = null;
          }
          return (
            iconName && (
              <Image source={iconName} style={{width: 30, height: 30}} />
            )
          );
        },
      })}>
      <Tab.Screen name={'Home'} component={MainStackScreen} />
      <Tab.Screen name={'Diagnose'} component={MainStackScreen} />
      <Tab.Screen
        options={{
          tabBarLabelStyle: {
            display: 'none',
          },
          tabBarIconStyle: {
            height: 10,
            width: 10,
          },
          tabBarItemStyle: {
            backgroundColor: '#28AF6E',
            borderRadius: 55,
            marginTop: -30,
            height: 75,
          },
        }}
        name={'Label'}
        component={MainStackScreen}
      />
      <Tab.Screen name={'My Garden'} component={MainStackScreen} />
      <Tab.Screen name={'Profile'} component={MainStackScreen} />
    </Tab.Navigator>
  );
};
export default SearchStackScreen;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#f55524',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
