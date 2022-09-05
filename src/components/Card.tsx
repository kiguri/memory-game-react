import React from "react";
import clsx from "clsx";

import { useGame } from "../providers/GameProvider";

export default function Card({ id, image }: { id: string; image: string }) {
  const game = useGame();

  const isInPair = game?.currentPair.some((cardId) => cardId === id);
  const isOpened = game?.openedList.some((cardId) => cardId === id);

  const open = () => {
    game?.openCard(id);
  };

  return (
    <div
      role="button"
      className="h-24 w-24 cursor-pointer perspective"
      onClick={open}
    >
      <div
        className={clsx(
          "relative rounded border border-slate-100 preserve-3d w-full h-full duration-700",
          (isInPair || isOpened) && "my-rotate-y-180"
        )}
      >
        <div className="absolute my-rotate-y-180 backface-hidden">
          <img src={image} alt={id} className="select-none" />
        </div>
        <div className="absolute backface-hidden w-full h-full flex items-center justify-center  bg-orange-500">
          <img
            className="w-16 h-16"
            src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
          />
        </div>
      </div>
    </div>
  );
}
