import React from "react";
import { Image, FlatList, View, StyleSheet, ImageBackground } from "react-native";
import { IconButton, Surface } from "react-native-paper";
import { Feed } from "react-native-rss-parser";
import { useStateValue } from "../state";
import theme from "../theme";
import SingleEpisode from "./SingleEpisode";
import { StackNavgProps } from "../types";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryDarker,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  cover: {
    width: 120,
    height: 120,
  },
  coverBG: {
    flexDirection: "row",  
    padding: 3,
    alignItems: "flex-end",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    height: 250,
  },
  surface: {
    flex: 1,
    elevation: 12
  },
  coverBGImage: {
    resizeMode: "cover",
    width: 450,
    opacity: 0.5,
  }
});

const Separator = () => {
  return (
    <View style={{ height: 1 }}>
    </View>
  );
};

const ListHeader = ({ feed }: { feed: Feed }) => {
  const image = { uri: feed.itunes.image };
  return (
    <View style={styles.container}>
      <ImageBackground blurRadius={1.8} source={image} imageStyle={styles.coverBGImage} style={styles.coverBG}>
        <Surface style={[styles.cover, styles.surface, { backgroundColor : "transparent" }]}>
          <Image source={image} style={styles.cover}/>
        </Surface>
        <IconButton icon="magnify" onPress={() => console.log("search")}/>
        <IconButton icon="sort-variant" onPress={() => console.log("sort")}/>
      </ImageBackground>
    </View>
   
 );
};

const EpisodeList = ({ navigation } : StackNavgProps) => {
  const [ { feeds, currentFeed },  ] = useStateValue();
  const feed = feeds[currentFeed];
  return (
    <FlatList 
      data={feed.items}
      renderItem={({ item }) => <SingleEpisode item={item} playEpisode={() => navigation.navigate("player", { mini: false })}/>}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={() => <ListHeader feed={feed} />}
    />
  );
};

export default EpisodeList;