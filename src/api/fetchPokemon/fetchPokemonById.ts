'use server'

export const fetchPokemonById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.URL_API}/pokemon/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el Pokémon:", error);
    throw error;
  }
}