import {
  useState,
  createContext,
  useContext,
  useEffect,
  useCallback,
  type PropsWithChildren,
} from "react";
import moment from "moment";

type Pokemon = { id: string; image: string };

const pokemons: Pokemon[] = [
  {
    id: "1",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
  },
  {
    id: "2",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/022.png",
  },
  {
    id: "3",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/033.png",
  },
  {
    id: "4",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/044.png",
  },
  {
    id: "5",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/055.png",
  },
  {
    id: "6",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/066.png",
  },
];

type GameProps = {
  pokemons: Pokemon[];
  isGameStart: boolean;
  playingTime: number;
  currentPair: string[];
  openedList: string[];
  start: () => void;
  openCard: (id: string) => void;
};

export const GameContext = createContext<GameProps | undefined>(undefined);

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = (props: PropsWithChildren) => {
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>(() =>
    shuffle(pokemons)
  );
  const [isGameStart, setIsGameStart] = useState(false);
  const [playingTime, setPlayingTime] = useState(0);
  const [openedList, setOpenedList] = useState<string[]>([]);
  const [currentPair, setCurrentPair] = useState<string[]>([]);

  // Thời gian chơi
  useEffect(() => {
    let interval: number;
    if (isGameStart) {
      let startTime = moment();
      interval = setInterval(() => {
        setPlayingTime(moment().diff(startTime, "seconds"));
      });
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameStart]);

  // Check 2 card khi mở
  useEffect(() => {
    let timeout: any = null;
    if (currentPair.length === 2) {
      if (currentPair[0].split("-")[0] === currentPair[1].split("-")[0]) {
        setOpenedList([...openedList, ...currentPair]);
        setCurrentPair([]);
      } else {
        timeout = setTimeout(() => {
          setCurrentPair([]);
        }, 1000);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentPair, openedList]);

  // Check win nếu mở đủ 12 card
  useEffect(() => {
    if (openedList.length === 12) {
      setIsGameStart(false);
    }
  }, [openedList]);

  const start = useCallback(() => {
    setPokemonsList(shuffle(pokemons));
    setIsGameStart(true);
    setOpenedList([]);
  }, []);

  const openCard = useCallback(
    (id: string) => {
      if (!isGameStart) return;
      if (currentPair.length >= 2) return;

      const isOpened = openedList.some((cId) => cId === id);
      const isInCurrentPair = currentPair.some((cId) => cId === id);

      if (isOpened || isInCurrentPair) return;

      setCurrentPair([...currentPair, id]);
    },
    [isGameStart, openedList, currentPair]
  );

  return (
    <GameContext.Provider
      value={{
        pokemons: pokemonsList,
        isGameStart,
        playingTime,
        currentPair,
        openedList,
        start,
        openCard,
      }}
      {...props}
    />
  );
};

function shuffle(pokemons: Pokemon[]) {
  const copied: Pokemon[] = pokemons.map((p) => {
    return {
      ...p,
      id: `${p.id}-copy`,
    };
  });
  let newPkms = [...pokemons, ...copied];

  let currentIndex = newPkms.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [newPkms[currentIndex], newPkms[randomIndex]] = [
      newPkms[randomIndex],
      newPkms[currentIndex],
    ];
  }

  return newPkms;
}
