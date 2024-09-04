'use server'

export const fetchPokemon = async () => {
    const urlPokemon = "https://pokeapi.co/api/v2"

    try {
        const response = await fetch(`${urlPokemon}/pokemon?limit=150`);
        const data = await response.json();
        console.log(data.results)
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
    }
}