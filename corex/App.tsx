import React from 'react';
import {StyleSheet, View} from 'react-native';

import UserLocation from './src/pages/UserLocation/UserLocation';
import VoiceRecognition from './src/pages/VoiceRecognition/VoiceRecognition';

const App: React.FC = () => {
  return (
    <View style={styles.mainContainer}>
      <UserLocation />

      <VoiceRecognition />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default App;
