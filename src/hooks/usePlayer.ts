import { useEffect } from "react";
import { Audio } from "expo-av";
import { Player } from "../types";
import { useStateValue } from "../state";

const currentSound = new Audio.Sound();

const usePlayer = (mini = false) : Player => {
  const [{ currentItem }, ] = useStateValue();
  useEffect(() => {
    const autoPlay = async () => {
      if (currentItem && !mini) {
        try {
          await currentSound.unloadAsync();
          await currentSound.loadAsync({ uri: currentItem.enclosures[0].url });
          await currentSound.playAsync();
        }
        catch (e) {
          console.log(`Couldn't load new sound `, e);
        }
      }
    };
    void  autoPlay();
  }, [currentItem]);

  const playTrack = async () => {
    try {
      const status = await currentSound?.getStatusAsync();
      if (status && status.isLoaded && !status.isPlaying) {
        await currentSound?.playAsync();
      }
    } catch (e) {
      console.log("Playing error", e);
    }
  };

  const pauseTrack = async () => {
    try {
      await currentSound?.pauseAsync();
    } catch (e) {
      console.log("Cannot play track");
    }
  };

  const stopTrack = async () => {
    try {
      await currentSound?.unloadAsync();
    } catch (e) {
      console.log("unloading track", e);
    }
  };

  const seek = async (currentValue: number) => {
    try {
      await pauseTrack();
      await currentSound?.setPositionAsync(currentValue);
      await playTrack();
    } catch (e) {
      console.log(e);
    }
  };

  return ({ controller: { play: playTrack, pause: pauseTrack, seek, stop: stopTrack }, sound: currentSound });
};

export default usePlayer;