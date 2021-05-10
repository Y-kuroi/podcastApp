

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
