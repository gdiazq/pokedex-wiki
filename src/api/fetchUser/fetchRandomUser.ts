export const fetchRandomUser = async () => {
    try {
        const response = await fetch(`${process.env.URL_API}`);
        if (!response.ok) {
            console.error('Network response status:', response.status);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error al obtener los Pokémon:", error);
        throw error;
    }
}