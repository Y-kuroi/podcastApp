import React from "react";
import { IconButton, Searchbar } from 'react-native-paper';
import { StyleSheet, View } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    paddingHorizontal: 15,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  searchBar: {
    flex: 1,
  }
});

const AppBar = () => {
  // const [searchQuery, setSearchQuery] = React.useState('');

  // const onChangeSearch = (query: string) => setSearchQuery(query);
  return (
    <View style={styles.container}>
      {/* <Searchbar style={styles.searchBar} placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} /> */}
      <IconButton icon="magnify" color={theme.colors.secondary} onPress={() => console.log("search")}/>
      <IconButton icon="dots-vertical" color={theme.colors.secondary} onPress={() => console.log("menu")}/>
    </View>
  );
};

export default AppBar;