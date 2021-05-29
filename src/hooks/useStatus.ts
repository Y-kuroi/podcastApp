import moment from "moment";
import { useState, useEffect } from "react";
import { useDebouncedCallback } from 'use-debounce';
import { Player, SliderProps } from "../types";

const useStatus = (player : Player) => {
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({ currentValue: 0, duration: 0 });
  const [ canRun, setCanRun ] = useState(true);
  const debounce = useDebouncedCallback(async () => {
    const getStatus = async () => {
      try {
        const status = await player.sound.getStatusAsync();
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          setSliderProps(
            { currentValue: status.positionMillis,
              duration: status.durationMillis,
              currentValueConverted: moment.duration(status.positionMillis),
              durationConverted: moment.duration(status.durationMillis)
            }
          );
        }
      }
      catch (e) {
        console.log(e);
      }
    };
    await getStatus();
    setCanRun(true);
    debounce.cancel();
  }, 300);
  useEffect(() => {
    if (canRun) {
      setCanRun(false);
      void debounce();
    }
  }, [canRun]);
  return { isPlaying, sliderProps };
};

export default useStatus;