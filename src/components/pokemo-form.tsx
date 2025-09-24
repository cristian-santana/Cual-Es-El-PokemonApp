import { useState } from "react";
import type { GameState } from "../hooks/use-game-manager";

interface Props {
  handlePokemonNameSubmit: (userInput: string) => void;
  gameState: GameState;
}

const PokemonForm = ({handlePokemonNameSubmit, gameState}: Props) => {

  const  [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      console.log("Input is empy");
      return;
    }
     handlePokemonNameSubmit(inputValue.trim().toLowerCase());
     setInputValue("");
  }
  
  return (
      <form className="input-group my-3"
      onSubmit={handleSubmit}>
        
  <input
    type="text"
    className="form-control"
    placeholder="¿Quien es ese pokemon?"
    aria-label="¿Quien es ese pokemon?"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    autoFocus
    disabled={gameState !== "playing"}
  />
  <button
    className="btn btn-outline-dark"
    type="submit"
    disabled={!inputValue.trim()|| gameState !== "playing"}
   
  >
    Button
  </button>
</form>

  )
}

export default PokemonForm