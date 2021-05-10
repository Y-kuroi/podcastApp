import React, { useState } from "react";
import { FeedItem } from "react-native-rss-parser/index";
import usePlayer from "../hooks/usePlayer";
import { SliderProps } from "../types";
import MiniPlayer from "./MiniPlayer";
import MainPlayer from "./MainPlayer";

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

const PodcastPlayer = ({ episodeMetaData = placeHolder, route } : { episodeMetaData? : FeedItem  }) => {
  const [ sliderProps, setSliderProps ] = useState<SliderProps>({currentValue: 0 , duration: 1});
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false);
  const { player } = usePlayer(episodeMetaData, setSliderProps);
  const mini = route ? route.params.mini : true;
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
    (mini &&
      <MiniPlayer 
        uri={episodeMetaData.itunes?.image}
        sliderProps={sliderProps}
        isPlaying={isPlaying}
        play={playEpisode}
        pause={pauseEpisode}
      />
    || !mini &&
      <MainPlayer 
        uri={episodeMetaData.itunes?.image}
        sliderProps={sliderProps}
        isPlaying={isPlaying}
        title={episodeMetaData.title}
        subtitle={episodeMetaData.itunes.subtitle}
        play={playEpisode}
        pause={pauseEpisode}
        seek={seek}
      />)
    );
};

export default PodcastPlayer;
