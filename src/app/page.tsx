// Objective: Create the main page of the app
'use client'

import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners"
import Navbar  from '@/components/layout/Navbar'
import { fetchAllPokemon } from '@/api/fetchAllPokemon/fetchAllPokemon'

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Array<{ 
    type: { 
      name: string 
    } 
  }>;
  weight: number;
  height: number;
  abilities: Array<{ 
    ability: { 
      name: string 
    } 
  }>;
}

export default function Home({ initialPokemon }: { initialPokemon: PokemonDetails[] | null }) {
  const [pokemon, setPokemon] = useState<PokemonDetails[]>(initialPokemon || []);
  const [loading, setLoading] = useState<boolean>(!initialPokemon);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPokemon) {
      const loadPokemon = async () => {
        try {
          const fetchedPokemon = await fetchAllPokemon();
          setPokemon(fetchedPokemon);
        } catch (error) {
          setError('Error al cargar los Pokémon');
        } finally {
          setLoading(false);
        }
      };
      loadPokemon();
    } else {
      setLoading(false);
    }
  }, [initialPokemon]);

  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="space-y-6 py-24 text-center px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md">
            Pokedex App
          </h1>
          <div>
            { loading ? (
               <BeatLoader />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pokemon.map((p) => (
                <div key={p.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
                  <img 
                    className="mx-auto w-32 h-32"
                    src={p.sprites.other.dream_world.front_default || p.sprites.front_default} 
                    alt={p.name}
                  />
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white capitalize">{p.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tipo: {p.types.map(t => t.type.name).join(', ')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">Peso: {p.weight / 10} kg</p>
                  <p className="text-gray-600 dark:text-gray-300">Altura: {p.height / 10} m</p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Habilidades: {p.abilities.map(a => a.ability.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </main>
    </>
  );
}
