import { useGame } from "../providers/GameProvider";
import Card from "./Card";

export default function Board() {
  const game = useGame();
  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {game?.pokemons.map((pkm) => {
        return <Card key={pkm.id} id={pkm.id} image={pkm.image} />;
      })}
    </div>
  );
}
