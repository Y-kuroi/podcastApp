import React, { createContext, useContext, useReducer } from "react";
import { Feed, FeedItem } from "react-native-rss-parser";
import { Action } from "./reducer";

export type State = {
  feeds: { [ id: string ] : Feed };
  currentFeed: string;
  currentItem?: FeedItem;
};

const initialState : State = {
  feeds: { },
  currentFeed: "",
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

export const setRssFeeds = (payload: { [ id : string] : Feed}) : Action => {
  return {
    type: "SET_RSS_FEEDS",
    payload
  };
};

export const setCurrentFeed = (payload: string) : Action => {
  return {
    type: "SET_CURRENT_FEED",
    payload
  };
};

export const setCurrentEpisode = (payload: FeedItem) : Action => {
  return {
    type: "SET_CURRENT_EPISODE",
    payload
  };
};

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);