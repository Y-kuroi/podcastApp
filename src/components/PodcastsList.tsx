import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";;
import SingleItem from "./SingleItem";
import { useStateValue } from "../state";

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

const PodcastsList = () => {
  const [ { feeds } , _ ] = useStateValue();
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={SingleItem}
        data={feeds}
        keyExtractor={({ title }) => title}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default PodcastsList;