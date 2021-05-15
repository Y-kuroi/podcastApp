import React from "react";
import { StyleSheet } from "react-native";
import { Caption, Subheading, Surface, TouchableRipple, Title } from "react-native-paper";
import { FeedItem } from "react-native-rss-parser";
import { setCurrentEpisode, useStateValue } from "../state";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryComp,
    borderRadius: 5,
    margin: 3,
    width: "95%",
    alignSelf: "center",
    elevation: 6,
    padding: 2,
    justifyContent: "space-evenly"
  }
});

const SingleEpisode = ({ item, playEpisode } : { item : FeedItem, playEpisode(): void}) => {
  const [ , dispatch ] = useStateValue();
  const handlePress = () => {
    dispatch(setCurrentEpisode(item));
    playEpisode();
  };
  
  return (
    <TouchableRipple onPress={handlePress} rippleColor={theme.colors.primaryDarker}>
      <Surface style={styles.container}>
        <Title style={{ color: "white", fontSize: 16 }}>{item.title}</Title>
        <Subheading style={{ fontSize: 14 }}>{item.itunes.subtitle}</Subheading>
        <Caption>Duration: {item.itunes.duration}</Caption>
      </Surface>
    </TouchableRipple>
  );
};

export default SingleEpisode;