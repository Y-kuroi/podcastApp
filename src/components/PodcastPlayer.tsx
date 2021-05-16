import React, { useEffect, useState } from "react";
import { FeedItem } from "react-native-rss-parser/index";
import MainPlayer from "./MainPlayer";
import { useStateValue } from "../state";
import usePlayer from "../hooks/usePlayer";
import { SliderProps, StackNavgProps } from "../types";
import { useDebouncedCallback } from 'use-debounce';

const placeHolder : FeedItem = {
  id: "1",
  title: "-",
  links: [{
    url: "example.com",
    rel: "rel"
  }],
  description: "-",
  content: "-",
  authors: [undefined],
  categories: [undefined],
  published: "-",
  enclosures: [{
      url: "example.com",
      length: "string",
      mimeType: "string",
  }],
  itunes: {
      authors: undefined,
      block: undefined,
      duration: "-",
      explicit: "-",
      image: undefined,
      isClosedCaptioned: undefined,
      order: undefined,
      subtitle: "-",
      summary: undefined,
  }
};

const PodcastPlayer = ({ route } : { route?: StackNavgProps["route"] }) => {
  const [{ currentItem, feeds, currentFeed }, ] = useStateValue();
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({ currentValue: 0, duration: 0 });
  const [ canRun, setCanRun ] = useState(true);
  const player = usePlayer(route?.params?.mini);
  const episodeMetaData = currentItem ?? placeHolder;
  const debounce = useDebouncedCallback(async () => {
    const getStatus = async () => {
      try {
        const status = await player.sound.getStatusAsync();
        if (status.isLoaded) {
          setIsPlaying(status.isPlaying);
          setSliderProps({ currentValue: status.positionMillis, duration: status.durationMillis});
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
  return(
    <MainPlayer 
      uri={episodeMetaData.itunes?.image ?? feeds[currentFeed]?.itunes.image}
      sliderProps={sliderProps}
      isPlaying={isPlaying}
      title={episodeMetaData.title}
      subtitle={episodeMetaData.itunes.subtitle}
      play={async () => await player?.controller.play()}
      pause={async () => await player?.controller.pause()}
      seek={async (value: number) => await player?.controller.seek(value)}
  />);
};

export default PodcastPlayer;
