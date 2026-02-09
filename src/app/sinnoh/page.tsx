'use client';

import React, { useEffect, useState } from 'react';
import { PokemonCard } from '@/components/card/PokemonCard';
import { BeatLoader } from 'react-spinners';
import { fetchPokemonSinnoh } from '@/api/fetchPokemonRegion/fetchPokemonSinnoh';
import Navbar from '@/components/layout/Navbar';
import { PokemonDetails } from '@/types/pokemon';

export default function RegionPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonSinnoh();

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
        setError(null);
      } catch {
        setError('Error al cargar los Pokemon');
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="page-wrap">
          <section className="page-hero">
            <h1 className="page-title">Region Sinnoh</h1>
            <p className="page-subtitle">
              Consulta Pokemon nativos de Sinnoh y revisa sus tipos, habilidades y descripcion.
            </p>
          </section>

          {loading ? (
            <div className="loading-shell">
              <BeatLoader />
              <p className="mt-3 text-sm" style={{ color: 'var(--text-muted)' }}>Cargando Pokemon...</p>
            </div>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="pokemon-grid">
              {pokemonDetails.map((p) => (
                <PokemonCard key={p.id} pokemon={p} />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
