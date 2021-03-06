import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { PlayerUI } from "../types";
import { Surface, Title, Subheading, IconButton, Caption } from 'react-native-paper';
import theme from "../theme";
import Constants from 'expo-constants';
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 60,
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
    width: "100%",
  },
  playButton: {
    borderColor: theme.colors.secondary,
    borderWidth: 1
  },
  timerContainer: {
    position: "absolute",
    flexDirection: "row",
    width: "100%",
    left: 20,
    top: 10,
    justifyContent: "space-between",
    height: 20,
  
  }
});

const MainPlayer = ({ uri, title, subtitle, sliderProps, isPlaying, play, pause, seek } : PlayerUI) => {
  return (
    <View style={styles.container}>
      <View style={styles.upperPart}>
        <Surface style={styles.surface}>
          <Image style={styles.cover} source={{ uri }} />
        </Surface>
        <Title numberOfLines={1}>{title}</Title>
        <Subheading numberOfLines={3} >{subtitle}</Subheading>
      </View>
      <View style={styles.lowerPart}>
        <View style={styles.timerContainer}>
          {sliderProps.currentValueConverted &&
          <Caption>
            {sliderProps.currentValueConverted.hours() ?
            `${sliderProps.currentValueConverted.hours()}:` : ""}
            {sliderProps.currentValueConverted.minutes() > 9
            ? sliderProps.currentValueConverted.minutes() :
            `0${sliderProps.currentValueConverted.minutes()}`}
            :{sliderProps.currentValueConverted.seconds() > 9
            ? sliderProps.currentValueConverted.seconds() :
            `0${sliderProps.currentValueConverted.seconds()}`}
          </Caption>|| <Caption>00:00</Caption>}
          {sliderProps.durationConverted &&
          <Caption>
            {sliderProps.durationConverted.hours() ?
            `${sliderProps.durationConverted.hours()}:` : ""}
            {sliderProps.durationConverted.minutes() > 9
            ? sliderProps.durationConverted.minutes() :
            `0${sliderProps.durationConverted.minutes()}`}
            :{sliderProps.durationConverted.seconds() > 9
            ? sliderProps.durationConverted.seconds() :
            `0${sliderProps.durationConverted.seconds()}`}
          </Caption> || <Caption>00:00</Caption>}
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={sliderProps.duration ?? 1}
          minimumTrackTintColor="#003350"
          maximumTrackTintColor="#000000"
          thumbTintColor={theme.colors.secondary}
          value={sliderProps.currentValue}
          onSlidingStart={pause}
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
            onPress={play}
            style={styles.playButton}
          />}
          {isPlaying && <IconButton
            icon="pause-circle" 
            color={theme.colors.secondary}
            size={80}
            onPress={pause}
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
    </View>
  );
};

export default MainPlayer;