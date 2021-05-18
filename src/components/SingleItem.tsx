import React from "react";
import { Subheading, Surface, Title, Caption } from "react-native-paper";
import { Feed } from "react-native-rss-parser";
import { Image, Pressable, StyleSheet, View } from "react-native";
import theme from "../theme";
import { setCurrentFeed, useStateValue } from "../state";
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  box: {
    elevation: 4,
    borderRadius: 6,
    height: 100,
    backgroundColor: theme.colors.primaryComp
  },
  cover: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
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
  const lastUpdated = moment(item.items[0]?.published ?? item.lastUpdated).fromNow();
  return(
    <Surface style={styles.box}>
      <Pressable style={[styles.container, styles.box]} android_ripple={{color: theme.colors.primaryLighter, radius: -30}} onPress={handlePress}>
        <Image
          style={styles.cover}
          source={{
            uri: item.itunes.image
          }}
        />
        <View style={styles.infoContainer}>
          <Title numberOfLines={1} style={styles.title}>{item.title}</Title>
          <Subheading numberOfLines={1}>{item.itunes.authors[0].name}</Subheading>
          <Caption numberOfLines={1} style={styles.caption}>Last update: {lastUpdated}</Caption>
        </View>
      </Pressable>
    </Surface>
  );
};

export default SingleItem;