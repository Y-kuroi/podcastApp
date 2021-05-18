import React from "react";
import { StyleSheet } from "react-native";
import { Caption, Subheading, Surface, TouchableRipple, Title } from "react-native-paper";
import { FeedItem } from "react-native-rss-parser";
import { setCurrentEpisode, useStateValue } from "../state";
import moment from "moment";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primaryComp,
    borderRadius: 5,
    margin: 3,
    width: "95%",
    alignSelf: "center",
    elevation: 6,
    padding: 4,
    paddingLeft: 4,
    justifyContent: "space-evenly"
  }
});

const SingleEpisode = ({ item, playEpisode } : { item : FeedItem, playEpisode(): void}) => {
  const [ , dispatch ] = useStateValue();
  const handlePress = () => {
    dispatch(setCurrentEpisode(item));
    playEpisode();
  };

  const formatDuration = (strings: TemplateStringsArray , duration : string) => {
    const re = new RegExp("^\\d{1,2}:\\d{2}$");
    if (re.test(duration))
      duration = `00:${duration[1] === ":" ? `0${duration}` : duration}`;
    const converted = moment.duration(duration, duration.includes(":") ? undefined : "s");
    const hours = converted.hours();
    const minutes = converted.minutes();
    return `${strings[0]}${hours > 0 ? `${hours}h` : ""} ${minutes}min`;
  };

  return (
    <TouchableRipple onPress={handlePress} rippleColor={theme.colors.primaryDarker}>
      <Surface style={styles.container}>
        <Caption>{moment(item.published).format("llll")}</Caption>
        <Title style={{ color: "white", fontSize: 16 }}>{item.title}</Title>
        <Subheading style={{ fontSize: 14 }}>{item.itunes.subtitle}</Subheading>
        <Caption>{formatDuration`Duration: ${item.itunes.duration}`}</Caption>
      </Surface>
    </TouchableRipple>
  );
};

export default SingleEpisode;