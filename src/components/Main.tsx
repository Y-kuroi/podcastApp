import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch } from "react-router-native";
import PodcastPlayer from "./PodcastPlayer";
import NavBar from "./NavBar";
import * as rssParser from 'react-native-rss-parser';
import Constants from 'expo-constants';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4fb9e1",
    alignItems: "center",
    justifyContent:"space-between",
    paddingTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
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
    };
    void getRssFeed();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>App bar</Text>
      </View>
      {/* <Switch>
        <Route path="/explore">
          <View>
            <Text>Explore</Text>
          </View>
        </Route>
        <Route path="/" exact>
          <View>
            <Text>Home</Text>
          </View>
        </Route>
      </Switch> */}
      <View>
        {rssFeed && <PodcastPlayer episodeMetaData={rssFeed.items[0]} />}
        <View>
          <Text>Mini player should be here</Text>
        </View>
        <NavBar />
      </View>
    </View>
  );
};

export default Main;
