import { useEffect, useState } from "react";
import { fetchPokemon } from "../../api/fetchPokemon";
import { Card } from "../../components/Card/Card";
import styles from "./App.module.css";

export function App() {
  const [pokemons, setPokemons] = useState([]);
  const [picked, setPicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const updateBestScore = (newScore: number) => {
    if (newScore > bestScore) setBestScore(newScore);
  } 

  useEffect(() => {
    const fillPokemons = async () => {
      const newPokemons = [];
      for (let i = 1; i < 13; i++) {
        const fetchedPokemon = await fetchPokemon(i);
        newPokemons.push(fetchedPokemon);
      }
      setPokemons(newPokemons);
    };
    fillPokemons();
  }, []);

  const handleClick = (e, name) => {
    if (picked.includes(name)) {
      setPicked([]);
      setCurrentScore(0);
    } else {
      const newPickedArray = [...picked, name];
      setPicked(newPickedArray);
      setCurrentScore(newPickedArray.length);
      updateBestScore(newPickedArray.length);
    }
    
  }

  return (
    <>
      <header>
        <div>
          <h1>Pokemon Memory Game</h1>
          <div>Click on every pokemon one time each.</div>
        </div>
        <div>
          <div>Score: {currentScore}</div>
          <div>Best score: {bestScore}</div>
        </div>
      </header>
      <section className={styles.wrapper}>
        {pokemons.length > 0 && (
          <div className={styles.cards}>
            {pokemons.map((pokemon) => (
              <Card name={pokemon.name} url={pokemon.image} handler={(e) => handleClick(e, pokemon.name)} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
