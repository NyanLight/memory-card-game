import { useEffect, useState } from "react";
import { fetchPokemon } from "../../api/fetchPokemon";
import { Card } from "../../components/Card/Card";
import styles from "./App.module.css";
import { Pokemon } from "../../types/Pokemon.type";

export function App() {
  const [pokemons, setPokemons] = useState<Pokemon[] | []>([]);
  const [picked, setPicked] = useState<Pokemon[] | []>([]);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);

  const updateBestScore = (newScore: number) => {
    if (newScore > bestScore) setBestScore(newScore);
  };

  const shufflePokemons = () => {
    const array = pokemons;
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    setPokemons(array);
  };

  useEffect(() => {
    const fillPokemons = async () => {
      try {
        const newPokemons = [];
        for (let i = 1; i < 13; i++) {
          const fetchedPokemon = await fetchPokemon(i);
          newPokemons.push(fetchedPokemon);
        }
        setPokemons(newPokemons as Pokemon[]);
      } catch (error) {
        console.error(error);
      }
    };
    fillPokemons();
  }, []);

  const handleClick = (name: string) => {
    if (picked.includes(name as never)) {
      setPicked([]);
      setCurrentScore(0);
      shufflePokemons();
    } else {
      const newPickedArray = [...picked, name];
      setPicked(newPickedArray as Pokemon[]);
      setCurrentScore(newPickedArray.length);
      updateBestScore(newPickedArray.length);
      shufflePokemons();
    }
  };

  return (
    <div className={styles.game}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Pokemon Memory Game</h1>
          <div className={styles.description}>
            Click on every pokemon one time each.
          </div>
        </div>
        <div className={styles.scores}>
          <div>Score: {currentScore}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </header>
      <section className={styles.wrapper}>
        {pokemons.length > 0 && (
          <div className={styles.cards}>
            {pokemons.map((pokemon) => (
              <Card
                name={pokemon.name}
                url={pokemon.image}
                handler={() => handleClick(pokemon.name)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
