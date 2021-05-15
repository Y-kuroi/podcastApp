import React, { useState, useEffect } from "react";
import { FeedItem } from "react-native-rss-parser/index";
import usePlayer from "../hooks/usePlayer";
import { SliderProps, StackNavgProps } from "../types";
import MiniPlayer from "./MiniPlayer";
import MainPlayer from "./MainPlayer";
import { useStateValue } from "../state";

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

const PodcastPlayer = ({ episodeMetaData = placeHolder, route } : { episodeMetaData? : FeedItem, route?: StackNavgProps["route"]}) => {
  const [{ currentItem, feeds, currentFeed }, ] = useStateValue();
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({currentValue: 0 , duration: 1});
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
  const { player } = usePlayer(currentItem ?? episodeMetaData, setSliderProps);
  const mini = route?.params?.mini ?? true;
  episodeMetaData = currentItem ?? placeHolder;
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
    try {
      await player?.controller.seek(value);
      await player?.controller.play();
      setSliderProps({...sliderProps, currentValue: value});
      setIsPlaying(true);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const autoPlay = async () => {
      if (currentItem) {
        await player?.controller.play();
        setIsPlaying(true);
      }
    };
    void  autoPlay();
  }, [player]);
  return (
    ((mini &&
      <MiniPlayer 
        uri={episodeMetaData.itunes?.image ?? feeds[currentFeed]?.itunes.image}
        sliderProps={sliderProps}
        isPlaying={isPlaying}
        play={playEpisode}
        pause={pauseEpisode}
      /> || null)
    || (!mini &&
      <MainPlayer 
        uri={episodeMetaData.itunes?.image ?? feeds[currentFeed]?.itunes.image}
        sliderProps={sliderProps}
        isPlaying={isPlaying}
        title={episodeMetaData.title}
        subtitle={episodeMetaData.itunes.subtitle}
        play={playEpisode}
        pause={pauseEpisode}
        seek={seek}
      /> || null))
    );
};

export default PodcastPlayer;
