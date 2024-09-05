'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react"
import { RotateCw, Info } from 'lucide-react'
import { BeatLoader } from "react-spinners";
import { fetchPokemonJohto } from '@/api/fetchPokemonRegion/fetchPokemonJohto';
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

function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="relative w-full h-[400px] [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front of the card */}
        <Card className="absolute w-full h-full [backface-visibility:hidden]">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={`${pokemon.name} sprite`}
              className="w-full object-contain h-[300px] bg-gray-100"
              src={pokemon.sprites.front_default}
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b className="capitalize">{pokemon.name}</b>
            <Button
              isIconOnly
              color="primary"
              aria-label={`View details of ${pokemon.name}`}
              onClick={handleFlip}
            >
              <Info className="w-5 h-5" />
            </Button>
          </CardFooter>
        </Card>

        {/* Back of the card */}
        <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBody className="flex flex-col justify-center items-start p-4">
            <h2 className="text-2xl font-bold mb-2 capitalize">{pokemon.name}</h2>
            <p><strong>Type:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            <p><strong>Abilities:</strong> {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
          </CardBody>
          <CardFooter className="justify-center">
            <Button
              color="primary"
              endContent={<RotateCw className="w-4 h-4" />}
              onClick={handleFlip}
            >
              Flip Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default function Home({ initialPokemon }: { initialPokemon: Pokemon[] | null }) {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon || []);
  const [loading, setLoading] = useState<boolean>(!initialPokemon);
  const [error, setError] = useState<string | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const fetchedPokemon = await fetchPokemonJohto();
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