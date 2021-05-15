import React from "react";
import { IconButton, Title } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, View } from "react-native";
import theme from "../theme";
import Constants from 'expo-constants';
import Animated from 'react-native-reanimated';
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";

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
    flex: 1,
  },
  tabBar: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 2,
    alignSelf: "stretch",
  },
  title: {
    fontWeight: "bold",
    padding: 3,
    margin: 2,
    fontSize: 20,
  },
  sections: {
    flexDirection: "row"
  }
});


const TabBar = ({ state, descriptors, navigation, position } : MaterialTopTabBarProps) => {
  return (
    <View style={styles.tabBar}>
      <View style={styles.container}>
        <IconButton icon="magnify" color={theme.colors.secondary} onPress={() => console.log("search")}/>
        <IconButton icon="dots-vertical" color={theme.colors.secondary} onPress={() => console.log("menu")}/>
      </View>
      <View style={styles.sections}>
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
          const scale = Animated.interpolate(position, {
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1.1 : 1)),
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
              <Animated.View style={{ opacity, ...styles.title, transform: [{ scale }] }}>
                <Title>{label}</Title>
              </Animated.View>
            </TouchableOpacity>
          );
      })}
      </View>
    </View>
  );
};

export default TabBar;