 import { GameState } from "../hooks/use-game-manager";
 
 interface Props {
   loadNewPokemon: () => void;
   gameState: GameState
 }
const PokemonResult = ({loadNewPokemon, gameState }: Props) => {
  if (gameState === GameState.playing) {
    return null;
  }
  
  return (
    <div 
    className={`alert alert-${
      gameState === GameState.correct ? "success" : "danger"
    } text-center`}
    >
      {gameState === GameState.correct ? (
        <h2>!Correcto¡ <i className="bi bi-arrow-through-heart-fill"></i></h2>
      ) : (
        <h2>!Incorrecto¡ <i className="bi bi-bookmark-x"></i>
        </h2>
      )}
      <button 
      className="btn btn-dark mt-3"
      onClick={loadNewPokemon}
      > 
      Volver a jugar</button>
      </div>
  )
}

export default PokemonResult;