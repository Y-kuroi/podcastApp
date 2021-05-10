import { Feed } from "react-native-rss-parser";
import { State } from "./state";

export type Action = 
{
  type: "SET_RSS_FEEDS";
  payload: Feed[];
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_RSS_FEEDS":
      return { feeds: action.payload };
    default : return state;
  }
};