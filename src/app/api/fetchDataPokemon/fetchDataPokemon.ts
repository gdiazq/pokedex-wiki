'use server'

//Este es un ejemplo
export const fetchDataPokemon = async () => {    
    try {
        const response = await fetch(`${process.env.URL_API}/pokemon/ditto`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        throw error;
    }
}