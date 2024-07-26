/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  ScrollView,
  Text,
  Image,
  TextInput,
  View,
} from 'react-native';
import tw from 'twrnc';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './Authen/Login';
import MapCustom from './Map/MapCustom';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='Login'
            component={Login}
            options={{ headerShown: false }}
          />

        {/* <Stack.Screen
            name='MapCustom'
            component={MapCustom}
            options={{ headerShown: false }}
          />*/}
        </Stack.Navigator> 
      </NavigationContainer>
    </>
  );
}

export default App;
