import React from "react";
import { StyleSheet, View, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { MiniPlayerUI } from "../types";
import { Surface, IconButton } from 'react-native-paper';
import theme from "../theme";
import { TouchableHighlight } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  smallPlayerContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: theme.colors.primary,
    height: 100,
    flex: 0
  },
  smallPlayerSurface: {
    flex: 0,
    height: 75,
    width: 75,
    alignSelf: "flex-start",
    margin: 5,
    elevation: 6,
    borderRadius: 3,
  },
  smallPlayerCover: {
    height: 75,
    width: 75,
    borderRadius: 3,
    borderColor: theme.colors.primaryDarker,
    borderWidth: 1
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

const MiniPlayer = ({ uri, sliderProps, isPlaying, play, pause, goToMainPlayer } : MiniPlayerUI) => {
  return (
    <View style={styles.smallPlayerContainer}>
      <TouchableHighlight onPress={goToMainPlayer}>
        <Surface style={styles.smallPlayerSurface}>
          <Image
            style={styles.smallPlayerCover}
            source={{ uri }}
          />
        </Surface>
      </TouchableHighlight>
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
            size={35}
            onPress={play}
          />}
          {isPlaying && <IconButton
            icon="pause" 
            color={theme.colors.primaryDarker}
            size={35}
            onPress={pause}
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
};

export default MiniPlayer;