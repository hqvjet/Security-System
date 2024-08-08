/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
    View, Text, Image
} from 'react-native';
import { Input, Button, Icon } from '@ant-design/react-native';
import Toast from 'react-native-toast-message';
import { POLICE_API } from '../apis';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login(): React.JSX.Element {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onSubmit = () => {
        setLoading(true);
        POLICE_API.login(username, password)
            .then(async (res: any) => {
                showToast('success', 'Login successful!')
                navigation.navigate('MapCustom');
                await AsyncStorage.setItem('police_info', JSON.stringify(res.data));
            })
            .catch(() => {
                showToast('error', 'Login fail')
            })
    }

    const showToast = (type: string, text: string) => {
        Toast.show({
            type: type,
            text1: text,
            position: 'top',
        });
    };

    return (
        <View style={tw`flex bg-indigo-900 items-center justify-evenly h-full`}>
            <View style={tw`z-100`}>
                <Toast />
            </View>
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
                    prefix={<Icon name='user' style={tw`ml-3`} />}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                />
                <Input
                    style={tw`border-white border-2 mx-10 rounded-full text-white`}
                    inputStyle={tw`text-white`}
                    prefix={<Icon name='lock' style={tw`ml-3`} />}
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
