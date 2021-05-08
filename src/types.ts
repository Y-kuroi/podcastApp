
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

export interface MockFeed {
  id: number,
  author: string,
  image: string,
  lastUpdate: string,
  title: string
} 