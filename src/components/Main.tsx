import React, { useEffect } from 'react';
import { useStateValue, setRssFeeds } from "../state";
import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "../types";
import * as rssParser from 'react-native-rss-parser';
import PodcastPlayer from './PodcastPlayer';
import Home from "./Home";
import EpisodeList from "./EpisodeList";
import theme from '../theme';

const Stack = createStackNavigator<StackParamList>();

const rssLinks = [
  "https://feeds.npr.org/510312/podcast.xml",
  "https://samharris.org/subscriber-rss/?uid=PNIuCOPJFqnyhhg",
  "https://www.omnycontent.com/d/playlist/aaea4e69-af51-495e-afc9-a9760146922b/0a686f81-0eeb-455b-98be-ab0d00055d5e/1fab2b0b-a7f0-4d71-bf6d-ab0d00055d6c/podcast.rss",
  "https://www.interlochenpublicradio.org/podcast/points-north/rss.xml",
  "https://waer.drupal.publicbroadcasting.net/podcasts/117076/rss.xml",
  "https://kunm.drupal.publicbroadcasting.net/podcasts/117553/rss.xml",
  "https://feeds.podcastmirror.com/a-i-nation",
  "https://cnem.chem.ufl.edu/tinytechpodcast.xml"
];

const Main = () => {
  const [  , dispatch ] = useStateValue();
  useEffect(() => {
    const getRssFeed = async (link : string) => {
        const response = await fetch(link);
        const responseData = await response.text();
        return rssParser.parse(responseData);
    };
    const setFeedsArray = async (promises : Array<Promise<rssParser.Feed>>) => {
      const feeds = await Promise.all(promises);
      const map = Object.fromEntries(new Map(feeds.map(feed => [feed.title, feed])));
      dispatch(setRssFeeds(map));
    };
    const promises = rssLinks.map(link => getRssFeed(link));
    void setFeedsArray(promises);
  }, []);
  return (
    <>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerTitle: "Now Playing", headerTransparent : true, cardStyle: { backgroundColor: theme.colors.primary} }} name="player" component={PodcastPlayer} />
      <Stack.Screen options={{ headerTitle: "Episodes list", headerTransparent: true ,cardStyle: { backgroundColor: theme.colors.primaryLighterComp } }} name="EpsList" component={EpisodeList} />
    </Stack.Navigator>
    </>
  );
};

export default Main;
