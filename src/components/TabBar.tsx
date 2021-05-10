import React from "react";
import { IconButton, Title } from 'react-native-paper';
import { TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
import Tab from "./Tab";
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    paddingTop: Constants.statusBarHeight,
    alignSelf: "stretch",
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 0
  },
  searchBar: {
    // height: "80%",
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.primary,
    alignSelf: "stretch",
  },
  title: {
    fontWeight: "bold",
    padding: 8,
    margin: 2,
    fontSize: 26
  }
});


const TabBar = ({state, descriptors, navigation, position }) => {
  return (
    <View style={styles.tabBar}>
      <View style={styles.container}>
        <IconButton icon="magnify" color={theme.colors.secondary} onPress={() => console.log("search")}/>
        <IconButton icon="dots-vertical" color={theme.colors.secondary} onPress={() => console.log("menu")}/>
      </View>
      <ScrollView horizontal>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
          });
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <Animated.Text style={{ opacity, ...styles.title }}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
      })}
      </ScrollView>
    </View>
  );
};

export default TabBar;