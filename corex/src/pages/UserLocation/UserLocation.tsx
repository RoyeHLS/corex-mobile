import React, {useState} from 'react';
import {Button, View, Text, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {styles} from './styles';
import {ILocation} from '../../utils/types';

const UserLocation: React.FC = () => {
  const [location, setLocation] = useState<ILocation>();

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = position.coords.longitude.toString();
        const currentLatitude = position.coords.latitude.toString();
        setLocation({
          latitude: currentLatitude,
          longitude: currentLongitude,
        });
      },
      error => {
        return Alert.alert(error.message);
      },
    );
  };

  return (
    <View>
      <Button title="Get User Location" onPress={getUserLocation} />
      <View style={styles.flex}>
        <Text>
          {location ? (
            <View style={styles.flex}>
              <Text>Latitude: {location?.latitude}</Text>
              <Text>Longitude: {location?.longitude}</Text>
            </View>
          ) : (
            'Press to get location'
          )}
        </Text>
      </View>
    </View>
  );
};

export default UserLocation;
