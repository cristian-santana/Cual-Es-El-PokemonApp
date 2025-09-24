import { useCallback, useEffect, useState } from "react";
import type { Pokemon } from "../types/pokemon-interface";
import { pokemonService } from "../services/pokemon.service";

export const GameState = {
    playing : "playing",
    correct : "correct",
    Wrong : "wrong",
} as const;

export type GameState = (typeof GameState)[keyof typeof GameState];

export const useGameManager = () => {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [gameState, setGameState] = useState<GameState>(GameState.playing);

    const handlePokemonNameSubmit = useCallback((
        userInput: string
    ) =>{
        if (!pokemon) return;
        const isValid = pokemonService.isPokemonNameValid(pokemon.name, userInput);

        setGameState(
            isValid ? GameState.correct : GameState.Wrong
        );
    }, [pokemon])


    const loadNewPokemon = useCallback( async () => {
        setIsLoading(true);
        setError(null);
        setGameState(GameState.playing);
        try {
           const getRandomPokemon = await pokemonService.getRandomPokemon();
           setPokemon(getRandomPokemon);
            }catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setIsLoading(false);
            }
        },[] )

        useEffect(() =>{
            loadNewPokemon()
        }, [ loadNewPokemon ])

        return {
            pokemon,
            isLoading,
            error,
            loadNewPokemon,
            gameState,
            handlePokemonNameSubmit,
        };

    };




