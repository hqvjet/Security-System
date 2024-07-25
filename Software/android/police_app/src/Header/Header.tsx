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

function Header({children}): React.JSX.Element {

  return (
    <View style={tw`bg-black w-full`}>
      <Text style={tw`text-white`}>Hello</Text>
    </View>
  );
}

export default Header;
