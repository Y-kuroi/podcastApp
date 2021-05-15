import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { CompositeNavigationProp, RouteProp, NavigatorScreenParams  } from '@react-navigation/native';

type Maybe<T> = T | undefined;

export interface Player {
  controller: {
    play(): Promise<void>;
    pause(): Promise<void>;
    seek(currentValue: number): Promise<void>;
  }
}

export interface SliderProps {
  currentValue: number;
  duration: number | undefined;
}

export interface PlayerUI {
  uri: Maybe<string>;
  title: string;
  subtitle: string;
  sliderProps: SliderProps;
  isPlaying: boolean;
  play(): Promise<void>;
  pause(): Promise<void>;
  seek(value: number): Promise<void>;
}

export type MiniPlayerUI = Omit<PlayerUI, "seek" | "subtitle" | "title">;

export type StackParamList = {
  Home: undefined;
  player: { mini: boolean } | undefined;
  EpsList: undefined;
};

type StackNavProps = StackNavigationProp<StackParamList, "Home" | "player" | "EpsList">;
type StackRouteProps = RouteProp<StackParamList, "Home" | "player" | "EpsList">;

export interface StackNavgProps {
  navigation: StackNavProps;
  route: StackRouteProps;
}

export type TabParamList = {
  Home: NavigatorScreenParams<StackParamList>;
  Podcasts: undefined;
  Recent: undefined;
  Favorites: undefined;
  Discover: undefined;
};

type TabNavProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TabParamList, "Podcasts" | "Recent" | "Favorites" | "Discover" | "Home">,
  StackNavigationProp<StackParamList>
>;

type TabRouteProps = RouteProp<TabParamList, "Podcasts" | "Recent" | "Favorites" | "Discover">;

export interface TabNavgProps {
  navigation: TabNavProps;
  route: TabRouteProps;
}