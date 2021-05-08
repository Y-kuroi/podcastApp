import React, { useState } from "react";
import { StyleSheet, View, Button, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { FeedItem } from "react-native-rss-parser/index";
import usePlayer from "../hooks/usePlayer";
import { SliderProps } from "../types";
import { Surface, Title, Text, Subheading, Colors, IconButton } from 'react-native-paper';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  upperPart: {
    backgroundColor: theme.colors.secondary,
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
    // width: 200,
  },
  playButton: {
    borderColor: theme.colors.secondary,
    borderWidth: 1
  },
  smallPlayerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    marginHorizontal: 5,
    backgroundColor: theme.colors.primaryLighter,
    padding: 2,
  },
  smallPlayerSurface: {
    flex: 0,
    height: 80,
    width: 80,
    borderTopLeftRadius: 10,
    paddingTop: 1.2,
    paddingLeft: 1.2,
    backgroundColor: theme.colors.primaryDarker
  },
  smallPlayerCover: {
    height: 78,
    width: 78,
    borderColor: theme.colors.primaryDarker,
    borderTopLeftRadius: 8,
    borderWidth: 1,
  },
  smallPlayerBox: {
    flex: 1,
  },
  smallPlayerControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});

const PodcastPlayer = ({ episodeMetaData } : { episodeMetaData : FeedItem  }) => {
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({currentValue: 0 , duration: 1});
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
  const { player } = usePlayer(episodeMetaData, setSliderProps);
  const mini = true;
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
  if (mini) {
    return (
      <View style={styles.smallPlayerContainer}>
       <Surface style={styles.smallPlayerSurface}>
          <Image
            style={styles.smallPlayerCover}
            source={{
              uri: episodeMetaData.itunes?.image
            }}
          />
        </Surface>
        <View style={styles.smallPlayerBox}>
          <Slider
            minimumValue={0}
            maximumValue={sliderProps.duration ? sliderProps.duration : 1}
            minimumTrackTintColor="#003350"
            maximumTrackTintColor="#000000"
            value={sliderProps.currentValue}
            disabled
          />
          <View style={styles.smallPlayerControls}>
            <IconButton
              icon="rewind-10" 
              color={theme.colors.primaryDarker}
              size={20}
              onPress={() => console.log("yea")}
            />
            {!isPlaying && <IconButton
              icon="play" 
              color={theme.colors.primaryDarker}
              size={30}
              onPress={playEpisode}
            />}
            {isPlaying && <IconButton
              icon="pause" 
              color={theme.colors.primaryDarker}
              size={30}
              onPress={pauseEpisode}
            />}
            <IconButton
              icon="fast-forward-30" 
              color={theme.colors.primaryDarker}
              size={18}
              onPress={() => console.log("yea")}
            />
          </View>
        </View>
      </View>
    );
  }
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
        thumbTintColor={theme.colors.secondary}
        value={sliderProps.currentValue}
        onSlidingStart={pauseEpisode}
        onSlidingComplete={seek}
      />
      <View style={styles.controls}>
        <IconButton
          icon="rewind" 
          color={theme.colors.secondary}
          size={55}
          onPress={() => console.log("yea")}
        />
        {!isPlaying && <IconButton
          icon="play-circle" 
          color={theme.colors.secondary}
          size={80}
          onPress={playEpisode}
          style={styles.playButton}
        />}
        {isPlaying && <IconButton
          icon="pause-circle" 
          color={theme.colors.secondary}
          size={80}
          onPress={pauseEpisode}
          style={styles.playButton}
        />}
        <IconButton
          icon="fast-forward" 
          color={theme.colors.secondary}
          size={60}
          onPress={() => console.log("yea")}
        />
      </View>
    </View>
  </View>);
};

export default PodcastPlayer;
