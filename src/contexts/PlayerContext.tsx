import { createContext, ReactNode, useContext, useState } from 'react';

interface PlayerProviderProps {
  children: ReactNode;
}

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  playEpisode: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function playEpisode(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  return(
    <PlayerContext.Provider value={{
      episodeList,
      currentEpisodeIndex,
      isPlaying,
      playEpisode,
      togglePlay,
      setPlayingState,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextData {
  const context = useContext(PlayerContext);

  return context;
}