import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { Surface, IconButton } from 'react-native-paper';
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "95%",
    alignItems: "stretch",
    elevation: 10,
    backgroundColor: theme.colors.primaryLighter,
  }
});

const Tab = ({icon, linkTo} : {icon: string, linkTo: string}) => {
  return (
    
    <Link
      to={linkTo}
      component={IconButton}
      icon={icon} size={30}
      onPress={() => console.log("pressed")}
      color={theme.colors.secondary}
    />
  );
};

const NavBar = () => {
  return (
    <Surface style={styles.container}>
      <Tab icon="home" linkTo="/"></Tab>
      <Tab icon="search-web" linkTo="/explore"></Tab>
    </Surface>
  );
};

export default NavBar;