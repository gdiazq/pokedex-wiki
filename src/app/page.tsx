'use client'

import React, { useEffect, useState } from 'react';
import { BeatLoader } from "react-spinners";
import Navbar from '@/components/layout/Navbar';
import { fetchAllPokemon } from '@/api/fetchAllPokemon/fetchAllPokemon';
import { PokemonCard } from '@/components/card/PokemonCard';

interface Pokemon {
  name: string;
  url: string;
}

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

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadPokemon = async () => {
    setLoading(true);
    try {
      const fetchedPokemon = await fetchAllPokemon(offset);
      setPokemon((prev) => [...prev, ...fetchedPokemon]);

      const detailsPromises = fetchedPokemon.map(async (p: { url: string }) => {
        const response = await fetch(p.url);
        return response.json();
      });

      const details = await Promise.all(detailsPromises);
      setPokemonDetails((prev) => [...prev, ...details]);

      setOffset((prev) => prev + 50); // Aumenta el offset
    } catch (error) {
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      loadPokemon();
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemonDetails.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemon]);

  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="space-y-6 py-24 px-4">
          <h1 className="text-5xl font-semibold text-black dark:text-white drop-shadow-md text-center">
            Pokedex App
          </h1>
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Buscar Pokémon por nombre..."
              className="px-4 py-2 border rounded-lg w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
            />

          </div>
          <div>
            {loading && pokemonDetails.length === 0 ? (
              <div className="flex justify-center">
                <BeatLoader />
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPokemon.length > 0 ? (
                    filteredPokemon.map((p) => (
                      <PokemonCard key={`${p.id}-${p.name}`} pokemon={p} />
                    ))
                  ) : (
                    <p className="text-center">No se encontraron Pokémon</p>
                  )}
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    onClick={loadPokemon}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Cargar 50 Pokémon más'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}