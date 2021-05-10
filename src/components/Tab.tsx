import React from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 26,
    paddingLeft: 10
  }
});

const Tab = ({ title, to } : { title: string; to: string}) => {
  return (
      <Title style={[styles.title]}>{title}</Title>
  );
};

export default Tab;