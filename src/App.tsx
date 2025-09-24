import { useWindowSize } from "react-use"
import PokemonForm from "./components/pokemo-form"
import PokemoDisplay from "./components/pokemon-display"
import PokemonResult from "./components/pokemon-result"
import { GameState, useGameManager } from "./hooks/use-game-manager";
import ReactConfetti from "react-confetti";

const App = () => {
  const { loadNewPokemon,pokemon, error, isLoading, gameState, handlePokemonNameSubmit, } = useGameManager();

  const { width, height} = useWindowSize();

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto my-5">
      {gameState === GameState.correct && (
        <ReactConfetti
        width={width}
        height={height}
        numberOfPieces={300}
        recycle={false}
        />
      )}




      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 bg-secondary">
          <PokemoDisplay 
          pokemon={pokemon}
          isLoading={isLoading}
          gameState={gameState}
          />
          <PokemonForm 
           gameState={gameState}
           handlePokemonNameSubmit={handlePokemonNameSubmit}/>
          <PokemonResult loadNewPokemon={loadNewPokemon} 
           gameState={gameState} />
        </div>
      </div>
    </div>
  )
}

export default App