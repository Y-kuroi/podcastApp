import { Feed, FeedItem } from "react-native-rss-parser";
import { State } from "./state";

export type Action = 
{
  type: "SET_RSS_FEEDS";
  payload: {[ id : string ]: Feed };
} |
{
  type: "SET_CURRENT_FEED";
  payload: string;
} |
{
  type: "SET_CURRENT_EPISODE";
  payload: FeedItem;
} |
{
  type: "SET_AS_FAVORITE";
  payload: Feed;
};

export const reducer = (state: State, action: Action): State => {
  const s = "sh";
  switch (action.type) {
    case "SET_RSS_FEEDS":
      return { ...state, feeds: action.payload };
    case "SET_CURRENT_FEED":
      return { ...state, currentFeed: action.payload };
    case "SET_CURRENT_EPISODE":
      return { ...state, currentItem: action.payload };
    case "SET_AS_FAVORITE":
      return { ...state, feeds: { ...state.feeds, [action.payload.title] : action.payload }};
    default : return state;
  }
};