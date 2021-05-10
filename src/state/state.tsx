import React, { createContext, useContext, useReducer } from "react";
import { Feed } from "react-native-rss-parser";
import { Action } from "./reducer";

export type State = {
  feeds: Feed[];
};

const initialState : State = {
  feeds: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

export const setRssFeeds = (payload: Feed[]) : Action => {
  return {
    type: "SET_RSS_FEEDS",
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