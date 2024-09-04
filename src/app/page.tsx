// Objective: Create the main page of the app
'use client'

import React, { useEffect, useState } from 'react';
import Navbar  from '@/components/layout/Navbar'
import { fetchPokemon } from '@/app/api/fetchPokemon'


export default function Home ({ initialPokemon }: { initialPokemon: any }) {
  const [pokemon, setPokemon] = useState(initialPokemon);

  useEffect(() => {
    if (!initialPokemon) {
      const loadPokemon = async () => {
        const fetchedPokemon = await fetchPokemon();
        setPokemon(fetchedPokemon);
      };
      loadPokemon();
    }
  }, [initialPokemon]);

  if (!pokemon) {
    return <p>Cargando Pokémon...</p>;
  }

  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="space-y-6 py-24 text-center px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md">
            Pokedex App
          </h1>
          <div>
            <ul>
              {pokemon.map((p: { name: string; }, index: React.Key | null | undefined) => (
                <li key={index}>
                  {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
