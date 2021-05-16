import React from "react";
import { useStateValue } from "../state";
import { FeedItem } from "react-native-rss-parser/index";
import MiniPlayer from "./MiniPlayer";
import usePlayer from "../hooks/usePlayer";

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

const PodcastPlayerMini = ({ goToMainPlayer } : { goToMainPlayer() : void }) => {
  const [{ currentItem, feeds, currentFeed }, ] = useStateValue();
  const player = usePlayer(true);
  const episodeMetaData = currentItem ?? placeHolder;
  const isPlaying = true;
  return (
    <MiniPlayer 
      uri={episodeMetaData.itunes?.image ?? feeds[currentFeed]?.itunes.image}
      sliderProps={{ currentValue: 0, duration: 0 }}
      isPlaying={isPlaying}
      play={async () => await player?.controller.play()}
      pause={async () => await player?.controller.pause()}
      goToMainPlayer={goToMainPlayer}
    />
  );
};

export default PodcastPlayerMini;