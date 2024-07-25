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

function Footer({children}): React.JSX.Element {

  return (
    <View style={tw`bg-black w-full`}>
      <Text>Hello</Text>
    </View>
  );
}

export default Footer;
