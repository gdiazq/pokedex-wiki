'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import Navbar from '@/components/layout/Navbar';
import { fetchAllPokemon } from '@/api/fetchAllPokemon/fetchAllPokemon';
import { PokemonCard } from '@/components/card/PokemonCard';
import { Pokemon, PokemonDetails } from '@/types/pokemon';

export default function Home() {
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

      const detailsPromises = fetchedPokemon.map(async (p: Pokemon) => {
        const [pokemonRes, speciesRes] = await Promise.all([
          fetch(p.url),
          fetch(p.url.replace('/pokemon/', '/pokemon-species/'))
        ]);
        const pokemon = await pokemonRes.json();
        const species = await speciesRes.json();
        const flavorEntry = species.flavor_text_entries?.find(
          (e: { language: { name: string } }) => e.language.name === 'en'
        );
        return {
          ...pokemon,
          description: flavorEntry?.flavor_text?.replace(/\f|\n/g, ' ') || ''
        };
      });

      const details = await Promise.all(detailsPromises);
      setPokemonDetails((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newDetails = details.filter((d: PokemonDetails) => !existingIds.has(d.id));
        return [...prev, ...newDetails];
      });

      offsetRef.current += 50;
      setError(null);
    } catch {
      setError('Error al cargar los Pokemon');
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
      <main>
        <div className="page-wrap">
          <section className="page-hero">
            <h1 className="page-title">Pokedex Wiki</h1>
            <p className="page-subtitle">
              Explora, busca y compara Pokemon por nombre o por region. Cada carta incluye datos base,
              tipos y descripcion para lectura rapida.
            </p>
            <div className="mx-auto mt-5 max-w-xl">
              <input
                type="text"
                placeholder="Buscar Pokemon por nombre..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </section>

          <section>
            {loading && pokemonDetails.length === 0 ? (
              <div className="loading-shell">
                <BeatLoader />
                <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>Cargando Pokemon...</p>
              </div>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : (
              <>
                <div className="pokemon-grid">
                  {filteredPokemon.map((p) => (
                    <PokemonCard key={`${p.id}-${p.name}`} pokemon={p} />
                  ))}
                </div>
                {filteredPokemon.length === 0 && searchTerm && (
                  <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                    No se encontraron Pokemon con "{searchTerm}".
                  </p>
                )}
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={loadPokemon}
                    className="primary-action"
                    disabled={loading}
                  >
                    {loading ? 'Cargando...' : 'Cargar 50 Pokemon mas'}
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
