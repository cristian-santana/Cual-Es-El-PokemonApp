import { getRandomIntInclusive } from "../lib/random-number";
import type { Pokemon } from "../types/pokemon-interface";

const POKEMON_API_URL = "https://Pokeapi.co/api/v2/pokemon";
const MAX_POKEMON_COUNT = 151;

export const getRandomPokemon = async (): Promise<Pokemon> => {
    const randomId = getRandomIntInclusive(1,
        MAX_POKEMON_COUNT);
        const Response = await fetch(`${POKEMON_API_URL}/${randomId}`);
        if (!Response.ok) {
            throw new Error(`Error Fetching Pokemon with Id $ {randomId}`);
        }

    const data = await Response.json();

    return {
        id: data.id,
        name:data.name,
        image:data.sprites.other["official-artwork"].front_default,
    };
};

const normalizedPokemonName = (name: string): string => {
    return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
   .replace(/[^a-z0-9]/g, "");
};

const isPokemonNameValid = (
    pokemonName: string,
    userInput: string,
) : boolean => {
    const normalizePokemonName = normalizedPokemonName(pokemonName);
    const normalizedUserInput = normalizedPokemonName(userInput);

    return normalizePokemonName === normalizedUserInput;
}

export const pokemonService = {
    getRandomPokemon,
    isPokemonNameValid,
  
};