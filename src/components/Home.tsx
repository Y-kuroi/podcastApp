import React from 'react';
import { View, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabParamList, StackNavgProps } from "../types";
import TabBar from "./TabBar";
import PodcastsList from './PodcastsList';
import Recent from "./Recent";
import Favorites from "./Favorites";
import Discover from "./Discover";
import { TouchableHighlight } from 'react-native-gesture-handler';
import theme from '../theme';
import PodcastPlayerMini from './PodcastPlayerMini';

const Tab = createMaterialTopTabNavigator<TabParamList>();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalContainer: {
    height: "90%",
    width: "90%",
    backgroundColor: theme.colors.primaryLighter,
    borderRadius: 5,
    margin: 20,
    padding: 2
  },
});

const Home = ({ navigation } : StackNavgProps) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name="Podcasts" component={PodcastsList} />
          <Tab.Screen name="Recent" component={Recent} />
          <Tab.Screen name="Favorites" component={Favorites} />
          <Tab.Screen name="Discover" component={Discover} />
        </Tab.Navigator>
      </View>
      <PodcastPlayerMini goToMainPlayer={() => navigation.navigate("player", {mini: true})}/>
    </View>
  );
};

export default Home;