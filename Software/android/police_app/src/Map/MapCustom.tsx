import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Geolocation from '@react-native-community/geolocation';
import { Button } from '@ant-design/react-native';

import { polices } from './MOCKDATA_POLICE'
import { violents } from './MOCKDATA_VIOLENT'

function MapCustom(): React.JSX.Element {

  const [position, setPosition] = useState<any>(null);
  const [coor_loading, setCoor_loading] = useState(false);
  const [police_marker, setPolice_Marker] = useState<any>([])
  const [violent_marker, setViolent_marker] = useState<any>([])

  const getPosition = () => {
    try {
      Geolocation.watchPosition(
        (position) => {
          setPosition(JSON.parse(JSON.stringify(position)));
          // setPosition(JSON.stringify(position));
          setCoor_loading(true);
        }
      );
    } catch (error) {

    }
  }

  const getPolice = () => {
    return polices
  }

  const getViolent = () => {
    return violents
  }

  useEffect(() => {
    setInterval(getPosition, 3000);
    setPolice_Marker(getPolice())
    setViolent_marker(getViolent())
  }, [])

  return (
    <>
      {coor_loading ? (
        <View>
          <MapView
            style={tw`w-full h-full`}
            initialRegion={{
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {police_marker.map((mark: any, index: number) => (
              <Marker
                key={index}
                coordinate={mark.latlng}
                title = 'Another Police'
                description= 'This is another police location'
                image={require('../../assets/police.png')}
              />
            ))}
            {violent_marker.map((mark: any, index: number) => (
              <Marker
                key={index}
                coordinate={mark.latlng}
                title = 'Violent Detected'
                description= 'This is location of the detected violent'
                image={require('../../assets/violent.png')}
              />
            ))}
            <Marker
              coordinate={{latitude: position.coords.latitude, longitude: position.coords.longitude}}
              title = 'You'
              description= 'This is your location'
            />
          </MapView>
        </View>

      ) : (
        <View style={tw`flex w-full h-full items-center justify-center`}>
          <Button loading disabled style={tw`border-0 bg-transparent`}><Text style={tw`text-3xl`}>Loading Map</Text></Button>
        </View>
      )}
    </>
  );
}

export default MapCustom;
