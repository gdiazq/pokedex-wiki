'use server'

export const fetchPokemonUnova = async () => {
    try {
        const response = await fetch(`${process.env.URL_API}/pokemon?offset=493&limit=156`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        throw error;
    }
}