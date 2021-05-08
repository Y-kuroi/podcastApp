import React from "react";
import { FlatList, StyleSheet, ScrollableList, View } from "react-native";
import { Title, Text } from "react-native-paper";
import { Feed } from "react-native-rss-parser";
import theme from "../theme";
import SingleItem from "./SingleItem";
import { MockFeed } from "../types";

const styles = StyleSheet.create({
  container: {
    height: "80%",
    alignSelf: "stretch",
    paddingHorizontal: 10,
  },
  title: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 26,
    paddingLeft: 10
  }
});

const Separator = () => {
  return (
    <View style={{height: 8}}>
    </View>
  );
};

const data : Array<MockFeed> = [
  {
    id: 0,
    author: "fringilla",
    image: "https://media.wired.co.uk/photos/606dbb257bdd70ad8525d194/master/w_1600%2Cc_limit/screenshot.jpg",
    lastUpdate:"08-05-2021",
    title: "sed velit"
  },
  {
    id: 1,
    author: "congue",
    image: "https://media.wired.co.uk/photos/606dbb25f19707fe1aef408b/master/w_1600%2Cc_limit/thisday_1x1_showname.png",
    lastUpdate:"08-05-2021 ",
    title: "dignissim sodale"
  },
  {
    id: 2,
    author: "nisi ",
    image: "https://media.wired.co.uk/photos/606dbb25f19707fe1aef408d/master/w_1600%2Cc_limit/scrubes.jpg",
    lastUpdate:"08-05-2021 ",
    title: "ut eu"
  },
  {
    id: 3,
    author: "vitae ",
    image: "https://media.wired.co.uk/photos/606dbb25687a704c2c3627e5/master/w_1600%2Cc_limit/the.jpg",
    lastUpdate:"08-05-2021",
    title: "sem integer"
  },
  {
    id: 4,
    author: "suscipit ",
    image: "https://media.wired.co.uk/photos/606dbb267bdd70ad8525d196/master/w_1600%2Cc_limit/image.jpg",
    lastUpdate:"08-05-2021",
    title: "vitae justo"
  },
  {
    id: 5,
    author: "tellus ",
    image: "https://media.wired.co.uk/photos/606dbb26ae8f3096ae16869c/master/w_1600%2Cc_limit/wired-thepodcast.jpg",
    lastUpdate:"08-05-2021",
    title: "eget magna "
  },
  {
    id: 6,
    author: "mauris",
    image: "https://media.wired.co.uk/photos/606dbb261dcb46afc3a1e2ff/master/w_1600%2Cc_limit/wecrashed.jpeg",
    lastUpdate:"08-05-2021",
    title: "fermentum iaculis"
  },
  {
    id: 7,
    author: "max",
    image: "https://media.wired.co.uk/photos/606dbb26a876dd2203a64e60/master/w_1600%2Cc_limit/the.jpg",
    lastUpdate: "08-05-2021",
    title: "eu non"
  },
];
const PodcastsList = ({ rssFeed } : {rssFeed : Feed}) => {
  
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Podcasts</Title>
      <FlatList
        renderItem={SingleItem}
        data={data}
        keyExtractor={({ id }) => id.toString()}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default PodcastsList;