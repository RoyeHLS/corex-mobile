import React, {useEffect, useState} from 'react';
import {Text, View, Button, Platform} from 'react-native';
import AudioRecorderPlayer, {
  RecordBackType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

interface IRecordingStatus {
  recordSecs: number;
  recordTime?: string;
}

interface IRecordingPlayingStatus {
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

const VoiceRecognition: React.FC = () => {
  const audioRecorderPlayer = new AudioRecorderPlayer();
  const [voiceReco, setVoiceReco] = useState('');
  const [recordingStatus, setRecordingStatus] = useState<IRecordingStatus>();
  const [recordingPlayingStatus, setRecordingPlayingStatus] =
    useState<IRecordingPlayingStatus>();

  const onStartRecord = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    audioRecorderPlayer.addRecordBackListener((event: RecordBackType) => {
      setRecordingStatus({
        recordSecs: event.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(
          Math.floor(event.currentPosition),
        ),
      });
      return;
    });
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setRecordingStatus({recordSecs: 0});
  };

  const onStartPlay = async () => {
    const msg = await audioRecorderPlayer.startPlayer();
    setVoiceReco(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      setRecordingPlayingStatus({
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      });
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const downloadVoiceFile = async () => {
    const dirs = RNFetchBlob.fs.dirs;
    const path = Platform.select({
      ios: 'sound.m4a',
      android: `${dirs.CacheDir}/sound.mp3`,
    });
    // uri(path to file)
    // Default path for android uri is {cacheDir}/sound.mp4
    // Default path for ios uri is {cacheDir}/sound.m4a
    const voiceUri = await audioRecorderPlayer.startRecorder(path);
  };

  return (
    <View>
      <Text>Voice recognition</Text>
      <Button title="Start Recording" onPress={onStartRecord} />
      <Button title="Stop Recording" onPress={onStopRecord} />
      <Button title="Start Play" onPress={onStartPlay} />
      <Button title="Pause Play" onPress={onPausePlay} />
      <Button title="Stop Play" onPress={onStopPlay} />
      <Text>{voiceReco}</Text>
    </View>
  );
};

export default VoiceRecognition;
