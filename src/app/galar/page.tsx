'use client';

import React, { useEffect, useState } from 'react';
import { PokemonCard } from '@/components/card/PokemonCard';
import { BeatLoader } from "react-spinners";
import { fetchPokemonGalar } from '@/api/fetchPokemonRegion/fetchPokemonGalar';
import Navbar from '@/components/layout/Navbar';
import { Pokemon, PokemonDetails } from '@/types/pokemon';

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonGalar();
        setPokemon(fetchedPokemon);

        const detailsPromises = fetchedPokemon.map(async (p: { url: string }) => {
          const [pokemonRes, speciesRes] = await Promise.all([
            fetch(p.url),
            fetch(p.url.replace('/pokemon/', '/pokemon-species/'))
          ]);
          const pokemon = await pokemonRes.json();
          const species = await speciesRes.json();
          const flavorEntry = species.flavor_text_entries?.find(
            (e: { language: { name: string } }) => e.language.name === 'en'
          );
          return { ...pokemon, description: flavorEntry?.flavor_text?.replace(/\f|\n/g, ' ') || '' };
        });

        const details = await Promise.all(detailsPromises);
        setPokemonDetails(details);

      } catch (error) {
        setError('Error al cargar los Pokémon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

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