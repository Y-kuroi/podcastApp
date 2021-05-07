import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  }
});

const NavBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text>Home</Text>
      </Link>
      <Link to="/explore">
        <Text>Explore</Text>
      </Link>
    </View>
  );
};

export default NavBar;