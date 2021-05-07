import React, { useState } from "react";
import { StyleSheet, View, Button, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { FeedItem } from "react-native-rss-parser/index";
import usePlayer from "../hooks/usePlayer";
import { SliderProps } from "../types";
import { Surface, Title, Text, Subheading, Colors, IconButton } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  upperPart: {
    backgroundColor: "white",
    borderRadius: 25,
    paddingBottom: 25,
    padding: 20,
    alignItems: "center",
  },
  cover: {
    height: 250,
    width: 250,
    borderRadius: 10,
  },
  surface: {
    height: 250,
    width: 250,
    marginTop: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 15
  },
  lowerPart : {
    padding: 25,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    height: 40,
    width: "100%"
  },
  playButton: {
    borderColor: "white",
    borderWidth: 1
  }
});

const PodcastPlayer = ({ episodeMetaData } : { episodeMetaData : FeedItem  }) => {
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({currentValue: 0 , duration: 1});
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
  const { player } = usePlayer(episodeMetaData, setSliderProps);
  const playEpisode = async () => {
    try {
      await player?.controller.play();
      setIsPlaying(true);
    } catch (e) {
      console.log(e);
    }
  };
  const pauseEpisode = async () => {
    try {
      await player?.controller.pause();
      setIsPlaying(false);
    } catch (e) {
      console.log(e);
    }
  };
  const seek = async (value : number) => {
    setSliderProps({...sliderProps, currentValue: value});
    try {
      await player?.controller.seek(value);
      await player?.controller.play();
      setIsPlaying(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
  <View style={styles.container}>
    <View style={styles.upperPart}>
      <Surface style={styles.surface}>
        <Image
          style={styles.cover}
          source={{
            uri: episodeMetaData.itunes?.image
          }}
        />
      </Surface>
      <Title>{episodeMetaData.title}</Title>
      <Subheading>{episodeMetaData.itunes.subtitle}</Subheading>
    </View>
    <View style={styles.lowerPart}>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={sliderProps.duration ? sliderProps.duration : 1}
        minimumTrackTintColor="#003350"
        maximumTrackTintColor="#000000"
        thumbTintColor="white"
        value={sliderProps.currentValue}
        onSlidingStart={pauseEpisode}
        onSlidingComplete={seek}
      />
      <View style={styles.controls}>
        <IconButton
          icon="rewind" 
          color="white"
          size={55}
          onPress={() => console.log("yea")}
        />
        {!isPlaying && <IconButton
          icon="play-circle" 
          color="white"
          size={80}
          onPress={playEpisode}
          style={styles.playButton}
        />}
        {isPlaying && <IconButton
          icon="pause-circle" 
          color="white"
          size={80}
          onPress={pauseEpisode}
          style={styles.playButton}
        />}
        <IconButton
          icon="fast-forward" 
          color="white"
          size={60}
          onPress={() => console.log("yea")}
        />
      </View>
    </View>
  </View>);
};

export default PodcastPlayer;
