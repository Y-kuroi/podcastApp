import React from "react";
import { Subheading, Surface, Title, Caption } from "react-native-paper";
import { Feed } from "react-native-rss-parser";
import { Image, Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import { setCurrentFeed, useStateValue } from "../state";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    elevation: 3,
    borderRadius: 6,
    flexWrap: "wrap",
    justifyContent: "space-around",
    height: 100,
    backgroundColor: theme.colors.primaryComp
  },
  cover: {
    width: 100,
    height: 100,
    flex: 0
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 5,
    justifyContent: "space-evenly"
  },
  title: {
    fontSize: 16,
  },
  caption: {
    fontStyle: "italic",
  }
});

const SingleItem = ({ item, navigate} : {item : Feed, navigate(): void }) => {
  const [ , dispatch ] = useStateValue();
  const handlePress = () => {
    dispatch(setCurrentFeed(item.title));
    navigate();
  };
  return(
    <Surface style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: item.itunes.image
        }}
      />
      <View style={styles.infoContainer}>
        <Pressable android_ripple={{color: "gray", radius: -30}} onPress={handlePress}>
          <Title numberOfLines={1} style={styles.title}>{item.title}</Title>
          <Subheading numberOfLines={1}>{item.itunes.authors[0].name}</Subheading>
          <Caption numberOfLines={1} style={styles.caption}>Last update: {item.lastUpdated}</Caption>
        </Pressable>
      </View>
    </Surface>
  );
};

export default SingleItem;