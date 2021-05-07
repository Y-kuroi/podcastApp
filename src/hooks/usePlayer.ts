import React, { useState, useEffect } from "react";
import { Audio, AVPlaybackStatus } from "expo-av";
import { FeedItem } from "react-native-rss-parser";
import { SliderProps, Player } from "../types";

const controller = new Audio.Sound();

const usePlayer = (track: FeedItem, setSliderProps: React.Dispatch<React.SetStateAction<SliderProps>>) => {
  const [ player, setPlayer ] = useState<Player>();

  useEffect(() => {
    setPlayer({ controller: { play: playTrack, pause: pauseTrack, seek }});
  }, [controller]);

  const onStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isLoaded && status.isPlaying)
      setSliderProps({ currentValue: status.positionMillis, duration: status.durationMillis });
  };

  const playTrack = async () => {
    if (track && controller) {
      try {
        const status = await controller.getStatusAsync();
        try {
          if (!status.isLoaded)
            await controller.loadAsync({ uri : track.enclosures[0].url });
        }
        catch (error) {
          console.log("Cannot load track", error);
        }
        finally {
          await controller.playAsync();
          controller.setOnPlaybackStatusUpdate(onStatusUpdate);
        }
      } catch (e) {
        console.log("Cannot play track");
      }
    }
  };

  const pauseTrack = async () => {
    if (controller) {
      try {
        const status = await controller.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
            await controller.pauseAsync();
          }
      } catch (e) {
        console.log("Cannot play track");
      }
    }
  };

  const seek = async (currentValue: number) => {
    if (controller) {
      try {
        const status = await controller.getStatusAsync();
        if (status.isLoaded)
          await controller.setPositionAsync(currentValue);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return { player };
};

export default usePlayer;