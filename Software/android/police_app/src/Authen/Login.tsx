/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    StyleSheet, View, Text, TextInput, TouchableOpacity,
    Image, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Card, Input, Button, Icon } from '@ant-design/react-native';
import tw from 'twrnc';

function Login(): React.JSX.Element {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = () => {
        setLoading(true);
        // API here
    }

    return (
        <View style={tw`flex bg-indigo-900 items-center justify-evenly h-full`}>
            <Image
                source={require('../../assets/logo_transparent.png')}
                style={tw`w-1/2 h-30`}
            />
            <View style={tw`flex items-center -mt-20`}>
                <Text style={tw`text-5xl font-black text-white`}>LOGIN</Text>
                <Text style={tw`text-xl font-thin text-blue-300`}>You Are Logining in As Police</Text>
            </View>

            <View style={tw`w-full flex gap-10`}>
                <Input
                    style={tw`border-white border-2 mx-10 rounded-full`}
                    inputStyle={tw`text-white`}
                    prefix={<Icon name='user' style={tw`ml-3`}/>}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    style={tw`border-white border-2 mx-10 rounded-full text-white`}
                    inputStyle={tw`text-white`}
                    prefix={<Icon name='lock' style={tw`ml-3`}/>}
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Button 
                loading={loading} 
                onPress={onSubmit}
                style={tw`px-32 rounded-full bg-red-400 border-0`}
            >
                <Text style={tw`text-white text-xl font-bold`}>Login</Text>
            </Button>
        </View>
    );
}

export default Login;
