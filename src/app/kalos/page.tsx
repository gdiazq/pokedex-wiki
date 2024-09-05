'use client';

import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import { fetchPokemonKalos } from '@/api/fetchPokemonRegion/fetchPokemonKalos';
import Navbar from '@/components/layout/Navbar';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string; 
  };
}

// Componente principal de la página
export default function Home({ initialPokemon }: { initialPokemon: Pokemon[] | null }) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon || []);
  const [loading, setLoading] = useState<boolean>(!initialPokemon);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]); // Estado para almacenar detalles de Pokémon

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonKalos();
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
        <div className="space-y-6 py-24 text-center px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md">
            Pokedex App
          </h1>
        <div>
          {loading ? (
            <BeatLoader />
          ) : (
            <ul>
              {pokemonDetails.map((p, index) => (
                <li key={index} className="flex items-center justify-center space-x-4">
                  <img src={p.sprites.front_default} alt={p.name} className="w-16 h-16" />
                  <span>{p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span>
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