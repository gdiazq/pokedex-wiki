'use server'

//Este es un ejemplo
export const fetchAllPokemon = async () => {    
    try {
        const response = await fetch(`${process.env.URL_API}/pokemon?limit=1025`);
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