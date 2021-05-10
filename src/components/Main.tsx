import React, { useEffect } from 'react';
import { useStateValue, setRssFeeds } from "../state";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import * as rssParser from 'react-native-rss-parser';
import { View, StyleSheet } from "react-native";
import TabBar from "./TabBar";
import PodcastsList from './PodcastsList';
import Recent from "./Recent";
import Favorites from "./Favorites";
import Discover from "./Discover";
import PodcastPlayer from './PodcastPlayer';
import theme from '../theme';
import { TouchableHighlight } from 'react-native-gesture-handler';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.colors.primaryLighter,
  },
});

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name="Podcasts" component={PodcastsList} />
          <Tab.Screen name="Recent" component={Recent} />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Discover" component={Discover} />
        </Tab.Navigator>
      </View>
      <TouchableHighlight onPress={() => navigation.navigate("player", { mini: false })}>
          <PodcastPlayer />
      </TouchableHighlight>
    </View>
  );
};

const Main = () => {
  const [ _, dispatch ] = useStateValue();
  useEffect(() => {
    const getRssFeed = async (link : string) => {
        const response = await fetch(link);
        const responseData = await response.text();
        return rssParser.parse(responseData);
    };
    const setFeedsArray = async (promises : Array<Promise<rssParser.Feed>>) => {
      const feeds = await Promise.all(promises);
      dispatch(setRssFeeds(feeds));
    };
    const promises = rssLinks.map(link => getRssFeed(link));
    void setFeedsArray(promises);
  }, []);
  return (
    <>
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
      <Stack.Screen options={{ headerTransparent : true, cardStyle: { backgroundColor: theme.colors.primary} }} name="player" component={PodcastPlayer} />
    </Stack.Navigator>
    </>
  );
};

export default Main;
