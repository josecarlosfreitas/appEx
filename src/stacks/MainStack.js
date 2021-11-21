import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './pages/SignIn/index';
import DetailsScreen from './pages/DetailsScreen';
import HomeScreen from './pages/HomeScreen';
import BottomNavigator from './navigation/BottomNavigator';

const Stack = createStackNavigator();

export default() => {
  return (
      <Stack.Navigator screenOptions=
          {{
              headerShown: false
          }}
          initialRouteName="SignIn"
          >
        <Stack.Screen name="SignIn" component={ SignIn } />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      </Stack.Navigator>
  );
}