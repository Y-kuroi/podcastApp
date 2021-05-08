import React from "react";
import { Subheading, Surface, Text, Title, Caption } from "react-native-paper";
import { Feed } from "react-native-rss-parser";
import { Image, StyleSheet, View } from "react-native";
import { MockFeed } from "../types";
import theme from "../theme";

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
  },
  caption: {
    fontStyle: "italic",
  }
});

const SingleItem = ({ item } : {item : MockFeed }) => {
  return(
    <Surface style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: item.image
        }}
      />
      <View style={styles.infoContainer}>
        <Title>{item.title}</Title>
        <Subheading>{item.author}</Subheading>
        <Caption style={styles.caption}>Last update: {item.lastUpdate}</Caption>
      </View>
    </Surface>
  );
};

export default SingleItem;