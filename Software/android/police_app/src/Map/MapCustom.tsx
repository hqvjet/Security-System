import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import Geolocation from '@react-native-community/geolocation';
import { Button } from '@ant-design/react-native';
import { POLICE_API } from '../apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

function MapCustom(): React.JSX.Element {
  const [position, setPosition] = useState<any>(null);
  const [police, setPolice] = useState<any>(null);
  const [coorLoading, setCoorLoading] = useState(false);
  const [policeMarkers, setPoliceMarkers] = useState<any[]>([]);

  const showToast = (type: string, text: string) => {
    Toast.show({
      type: type,
      text1: text,
      position: 'top',
    });
  };

  const getPosition = () => {
    try {
      Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition({ latlng: { latitude, longitude } });
          setCoorLoading(true);

          if (police) {
            POLICE_API.updateGeolocation(
              police.user_id,
              `${latitude},${longitude}`
            ).catch((error) => console.log('Error updating geolocation:', error));
          }
        },
        (error) => console.log('Error getting position:', error),
        { enableHighAccuracy: true, distanceFilter: 10 }
      );
    } catch (error) {
      console.log('Error in getPosition:', error);
    }
  };

  const getPolicesGeoLocation = () => {
    POLICE_API.getAllPolicesGeolocation()
      .then((res: any) => {
        const data = res.data;
        const otherMarkers = data.map((geo: string, i: number) => {
          const [lat, lng] = geo.split(',').map(parseFloat);
          if (police && i + 1 !== Number(police.user_id)) {
            return { latlng: { latitude: lat, longitude: lng } };
          }
        }).filter(Boolean);
        setPoliceMarkers(otherMarkers);
      })
      .catch((error) => console.log('Error fetching police locations:', error));
  };

  useEffect(() => {
    console.log(policeMarkers.length)
  }, [policeMarkers])

  useEffect(() => {
    const fetchPoliceInfo = async () => {
      try {
        const plc = await AsyncStorage.getItem('police_info');
        if (plc) {
          setPolice(JSON.parse(plc));
        } else {
          showToast('error', 'Oops!! There are some errors');
        }
      } catch (error) {
        console.log('Error fetching police info:', error);
        showToast('error', 'Oops!! There are some errors');
      }
    };
    fetchPoliceInfo();
  }, []);

  useEffect(() => {
    console.log('repeat')
    if (police) {
      const intervalId = setInterval(() => {
        getPosition();
        getPolicesGeoLocation();
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [police]);

  return (
    <>
      {coorLoading ? (
        <View>
          <View style={tw`z-10`}><Toast /></View>
          <MapView
            style={tw`w-full h-full`}
            initialRegion={{
              latitude: position.latlng.latitude,
              longitude: position.latlng.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            {policeMarkers.map((mark: any, index: number) => (
              <Marker
                key={index}
                coordinate={mark.latlng}
                title='Another Police'
                description='This is another police location'
                image={require('../../assets/police.png')}
              />
            ))}
            <Marker
              coordinate={position.latlng}
              title='You'
              description='This is your location'
            />
          </MapView>
        </View>
      ) : (
        <View style={tw`flex w-full h-full items-center justify-center`}>
          <Button loading disabled style={tw`border-0 bg-transparent`}>
            <Text style={tw`text-3xl`}>Loading Map</Text>
          </Button>
        </View>
      )}
    </>
  );
}

export default MapCustom;
