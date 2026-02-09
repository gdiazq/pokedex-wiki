'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
      'official-artwork': {
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
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetails[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const offsetRef = useRef<number>(0);

  const loadPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const fetchedPokemon = await fetchAllPokemon(offsetRef.current);
      setPokemon((prev) => [...prev, ...fetchedPokemon]);

      const detailsPromises = fetchedPokemon.map(async (p: { url: string }) => {
        const response = await fetch(p.url);
        return response.json();
      });

      const details = await Promise.all(detailsPromises);
      setPokemonDetails((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newDetails = details.filter((d: PokemonDetails) => !existingIds.has(d.id));
        return [...prev, ...newDetails];
      });

      offsetRef.current += 50;
    } catch (error) {
      setError('Error al cargar los Pokémon');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
      loadPokemon();
  }, [loadPokemon]);

  useEffect(() => {
    setFilteredPokemon(
      pokemonDetails.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonDetails]);

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
                  {filteredPokemon.map((p) => (
                    <PokemonCard key={`${p.id}-${p.name}`} pokemon={p} />
                  ))}
                </div>
                {filteredPokemon.length === 0 && searchTerm && (
                  <p className="text-center mt-4">No se encontraron Pokémon con &quot;{searchTerm}&quot;</p>
                )}
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