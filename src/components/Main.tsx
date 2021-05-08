import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from "react-router-native";
import PodcastPlayer from "./PodcastPlayer";
import NavBar from "./NavBar";
import AppBar from "./AppBar";
import * as rssParser from 'react-native-rss-parser';
import Constants from 'expo-constants';
import { Text } from 'react-native-paper';
import theme from "../theme";
import PodcastsList from './PodcastsList';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent:"space-between",
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
  bottomContainer: {
    // flex: 1
  }
});

const Main = () => {
  const [ rssFeed, setRssFeed ] = useState<rssParser.Feed>();

  useEffect(() => {
    const getRssFeed = async () => {
      const response = await fetch("https://samharris.org/subscriber-rss/?uid=PNIuCOPJFqnyhhg");
      const responseData = await response.text();
      const rssFeed = await rssParser.parse(responseData);
      setRssFeed(rssFeed);
      // console.log(rssFeed.title,
      //   rssFeed.lastUpdated, rssFeed.itunes);
    };
    void getRssFeed();
  }, []);

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/explore">
          <View>
            <Text>Explore</Text>
          </View>
        </Route>
        <Route path="/" exact>
          {rssFeed && <PodcastsList rssFeed={rssFeed}/>}
        </Route>
      </Switch>
      {rssFeed && <PodcastPlayer episodeMetaData={rssFeed.items[0]} />}
    </View>
  );
};

export default Main;
