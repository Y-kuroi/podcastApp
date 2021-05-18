import React from "react";
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { MiniPlayerUI } from "../types";
import { Surface, IconButton, ProgressBar } from 'react-native-paper';
import theme from "../theme";

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
  progressBar: {
    margin: 5,
    marginHorizontal: 8
  },
});

const MiniPlayer = ({ uri, sliderProps, isPlaying, play, pause, goToMainPlayer } : MiniPlayerUI) => {
  return (
    <View style={styles.smallPlayerContainer}>
      <Pressable onPress={goToMainPlayer}>
        <Surface style={styles.smallPlayerSurface}>
          <Image
            style={styles.smallPlayerCover}
            source={{ uri }}
          />
        </Surface>
      </Pressable>
      <View style={styles.smallPlayerBox}>
        <ProgressBar
          style={styles.progressBar}
          progress={sliderProps.currentValue / (sliderProps.duration ?? 1)}
          color={theme.colors.primaryDarker}
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