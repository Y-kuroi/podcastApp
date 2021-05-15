import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import SingleItem from "./SingleItem";
import { useStateValue } from "../state";
import { TabNavgProps } from "../types";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignSelf: "stretch",
    paddingHorizontal: 10,
    flex: 0
  },
});

const Separator = () => {
  return (
    <View style={{height: 8}}>
    </View>
  );
};

const PodcastsList = ({ navigation } : TabNavgProps) => {
  const [ { feeds } ,  ] = useStateValue();
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item }) => <SingleItem item={item} navigate={(): void => navigation.push("EpsList")} />}
        data={Object.values(feeds)}
        keyExtractor={({ title }) => title}
        ItemSeparatorComponent={Separator}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default PodcastsList;