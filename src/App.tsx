import { useEffect, useState } from 'react'
import { fetchPokemon } from './api/fetchPokemon'
import './App.css'

export function App() {
  useEffect(() => {
    const pokemons = [];
    const fillPokemons = async () => {
      for (let i = 1; i < 13; i++) {
        const fetchedPokemon = await fetchPokemon(i);
        pokemons.push(fetchedPokemon);
      }
    };
    fillPokemons();
  }, [])

  return (
    <>
    </>
  )
}

