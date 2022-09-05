import { useState } from "react";

import Board from "./components/Board";
import { useGame } from "./providers/GameProvider";

function App() {
  const game = useGame();

  const buttonLabel =
    !game?.isGameStart && !game?.playingTime
      ? "Start"
      : !game.isGameStart && game.playingTime
      ? "New game"
      : game.playingTime;

  return (
    <div className="bg-slate-800 h-screen grid place-content-center">
      <h4 className="text-white text-3xl text-center">
        {!game?.isGameStart &&
          (game?.playingTime as number) > 0 &&
          `You won in ${game?.playingTime} seconds`}
      </h4>
      <Board />
      <div className="w-full flex justify-center my-4">
        <button
          className="w-32 border rounded bg-rose-600 hover:bg-rose-700 text-white text-sm px-4 py-2 transition disabled:cursor-not-allowed disabled:bg-gray-500"
          onClick={() => game?.start()}
          disabled={game?.isGameStart}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

export default App;
