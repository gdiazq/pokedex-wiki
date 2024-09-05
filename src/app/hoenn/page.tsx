'use client'

import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners"
import { fetchPokemonHoenn } from '@/api/fetchPokemonRegion/fetchPokemonHoenn';
import Navbar from '@/components/layout/Navbar';

interface Pokemon {
    name: string;
}

export default function Home({ initialPokemon }: { initialPokemon: Pokemon[] | null }) {
    const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon || []);
    const [loading, setLoading] = useState<boolean>(!initialPokemon);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!initialPokemon) {
        const loadPokemon = async () => {
          try {
            const fetchedPokemon = await fetchPokemonHoenn();
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
                        {loading ? (
                            <BeatLoader />
                        ) : (
                            <ul>
                                {pokemon.map((p, index) => (
                                    <li key={index}>
                                        {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}