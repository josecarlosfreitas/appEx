// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './pages/SignIn/index';

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
      </Stack.Navigator>
  );
}