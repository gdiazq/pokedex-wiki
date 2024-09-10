import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button  } from "@nextui-org/react";
import { Image as ImageNext  } from '@nextui-org/react';
import { RotateCw, Info } from 'lucide-react';

const pokemonTypes: { [key: string]: { icon: string } } = {
  fire: { icon: '/pokemon-types/fire.svg' },
  grass: { icon: '/pokemon-types/grass.svg' },
  fairy: { icon: '/pokemon-types/fairy.svg' },
  dragon: { icon: '/pokemon-types/dragon.svg' },
  water: { icon: '/pokemon-types/water.svg' },
  electric: { icon: '/pokemon-types/electric.svg' },
  dark: { icon: '/pokemon-types/dark.svg' },
  psychic: { icon: '/pokemon-types/psychic.svg' },
  ground: { icon: '/pokemon-types/ground.svg' },
  flying: { icon: '/pokemon-types/flying.svg' },
  ghost: { icon: '/pokemon-types/ghost.svg' },
  fighting: { icon: '/pokemon-types/fighting.svg' },
  normal: { icon: '/pokemon-types/normal.svg' },
  poison: { icon: '/pokemon-types/poison.svg' },
  rock: { icon: '/pokemon-types/rock.svg' },
  bug: { icon: '/pokemon-types/bug.svg' },
  steel: { icon: '/pokemon-types/steel.svg' },
  ice: { icon: '/pokemon-types/ice.svg' },
    
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
                src={pokemon.sprites.other.dream_world.front_default}
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
                    className="flex items-center gap-1 px-2 py-1 bg-gray-100 rounded-full"
                  >
                    <ImageNext src={typeInfo.icon} alt={`${type.type.name} icon`} className="w-3 h-3 mr-1" />
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