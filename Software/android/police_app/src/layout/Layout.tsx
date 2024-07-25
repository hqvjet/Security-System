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

import Login from '../Authen/Login';

function Layout({children}): React.JSX.Element {

  return (
    <Login/>
  );
}

export default Layout;
