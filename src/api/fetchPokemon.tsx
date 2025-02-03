export async function fetchPokemon(id: number) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const json =  await response.json();
        const pokemon = {
            name: json.name,
            image: json.sprites.front_default,
        }
        return pokemon;
    } catch (error) {
       console.log(`Error:" ${error}`);
    }
}