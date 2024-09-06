'use client';

import React, { useEffect, useState } from 'react';
import { PokemonCard } from '@/components/card/PokemonCard';
import { BeatLoader } from "react-spinners";
import { fetchPokemonKanto } from '@/api/fetchPokemonRegion/fetchPokemonKanto';
import Navbar from '@/components/layout/Navbar';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string; 
  };
  types: Array<{ 
    type: { name: string } 
  }>;
  weight: number;
  height: number;
  abilities: Array<{ 
    ability: { name: string } 
  }>;
}

export default function Home({ initialPokemon }: { initialPokemon: Pokemon[] | null }) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon || []);
  const [loading, setLoading] = useState<boolean>(!initialPokemon);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonKanto();
        setPokemon(fetchedPokemon);

        const detailsPromises = fetchedPokemon.map(async (p: { url: string | URL | Request; }) => {
          const response = await fetch(p.url);
          return response.json();
        });

        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);

      } catch (error) {
        setError('Error al cargar los Pokémon');
      } finally {
        setLoading(false);
      }
    };

    if (!initialPokemon) {
      loadPokemon();
    } else {
      setLoading(false);
    }
  }, [initialPokemon]);

  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="space-y-6 py-24 px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md text-center">
            Pokedex App
          </h1>
          <div>
            {loading ? (
              <div className="flex justify-center">
                <BeatLoader />
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pokemonDetails.map((p) => (
                  <PokemonCard key={p.id} pokemon={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}