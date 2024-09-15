import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button  } from "@nextui-org/react";
import { Image as ImageNext  } from '@nextui-org/react';
import Image from 'next/image';
import { RotateCw, Info } from 'lucide-react';

const pokemonTypes: { [key: string]: { icon: string, color: string } } = {
  fire: { icon: '/pokemon-types/fire.svg', color: 'bg-red-500' },
  grass: { icon: '/pokemon-types/grass.svg', color: 'bg-green-500' },
  fairy: { icon: '/pokemon-types/fairy.svg', color: 'bg-pink-400' },
  dragon: { icon: '/pokemon-types/dragon.svg', color: 'bg-purple-600' },
  water: { icon: '/pokemon-types/water.svg', color: 'bg-blue-500' },
  electric: { icon: '/pokemon-types/electric.svg', color: 'bg-yellow-400' },
  dark: { icon: '/pokemon-types/dark.svg', color: 'bg-gray-800' },
  psychic: { icon: '/pokemon-types/psychic.svg', color: 'bg-pink-600' },
  ground: { icon: '/pokemon-types/ground.svg', color: 'bg-yellow-700' },
  flying: { icon: '/pokemon-types/flying.svg', color: 'bg-indigo-400' },
  ghost: { icon: '/pokemon-types/ghost.svg', color: 'bg-purple-800' },
  fighting: { icon: '/pokemon-types/fighting.svg', color: 'bg-orange-600' },
  normal: { icon: '/pokemon-types/normal.svg', color: 'bg-zinc-400' },
  poison: { icon: '/pokemon-types/poison.svg', color: 'bg-violet-800' },
  rock: { icon: '/pokemon-types/rock.svg', color: 'bg-stone-800' },
  bug: { icon: '/pokemon-types/bug.svg', color: 'bg-lime-300' },
  steel: { icon: '/pokemon-types/steel.svg', color: 'bg-gray-500' },
  ice: { icon: '/pokemon-types/ice.svg', color: 'bg-sky-400' },   
};

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

export function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);

  return (
    <div className="relative w-full h-[400px] [perspective:1000px]">
      <div
        className={`relative w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Frente de la tarjeta */}
        <Card className="absolute w-full h-full [backface-visibility:hidden]">
          <CardBody className="overflow-visible p-0 flex flex-col items-center justify-center">
            <div className="w-48 h-48 flex items-center justify-center">
              <ImageNext
                alt={`${pokemon.name} sprite`}
                className="object-contain max-w-full max-h-full"
                src={pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default}
              />
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b className="capitalize">{pokemon.name}</b>
            <div className="flex flex-wrap justify-center gap-1 mb-2">
              {pokemon.types.map((type) => {
                const typeInfo = pokemonTypes[type.type.name as keyof typeof pokemonTypes] || pokemonTypes.normal;
                return (
                  <div
                    key={type.type.name}
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-black rounded-full"
                  >
                    <Image src={typeInfo.icon} alt={`${type.type.name} icon`} width={4} height={4} className={`${typeInfo.color} rounded-full w-4 h-4 mr-1`} />
                    <span>{type.type.name}</span>
                  </div>
                );
              })}
            </div>
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

        {/* Parte trasera de la tarjeta */}
        <Card className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <CardBody className="flex flex-col justify-center items-center p-4">
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