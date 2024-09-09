import React, { useState } from 'react';
import { Card, CardBody, CardFooter, Button, Image } from "@nextui-org/react";
import { RotateCw, Info } from 'lucide-react';

// Importa correctamente los íconos como URLs
import bug from '../icons/pokemon-types/bug.svg';
import dragon from '../icons/pokemon-types/dragon.svg';
import electric from '../icons/pokemon-types/electric.svg';
import fairy from '../icons/pokemon-types/fairy.svg';
import fighting from '../icons/pokemon-types/fighting.svg';
import fire from '../icons/pokemon-types/fire.svg';
import flying from '../icons/pokemon-types/flying.svg';
import ghost from '../icons/pokemon-types/ghost.svg';
import grass from '../icons/pokemon-types/grass.svg';
import ground from '../icons/pokemon-types/ground.svg';
import ice from '../icons/pokemon-types/ice.svg';
import dark from '../icons/pokemon-types/dark.svg';  // Cambié la D mayúscula a minúscula para asegurarte de que el nombre del archivo sea correcto
import normal from '../icons/pokemon-types/normal.svg';
import poison from '../icons/pokemon-types/poison.svg';
import psychic from '../icons/pokemon-types/psychic.svg';
import rock from '../icons/pokemon-types/rock.svg';
import steel from '../icons/pokemon-types/steel.svg';
import water from '../icons/pokemon-types/water.svg';

// Objeto que asocia cada tipo de Pokémon con su ícono
const pokemonTypes: { [key: string]: { icon: string } } = {
  fire: { icon: fire },
  grass: { icon: grass },
  fairy: { icon: fairy },
  dragon: { icon: dragon },
  water: { icon: water },
  electric: { icon: electric },
  dark: { icon: dark },
  psychic: { icon: psychic },
  ground: { icon: ground },
  flying: { icon: flying },
  ghost: { icon: ghost },
  fighting: { icon: fighting },
  normal: { icon: normal },
  poison: { icon: poison },
  rock: { icon: rock },
  bug: { icon: bug },
  steel: { icon: steel },
  ice: { icon: ice },
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
              <Image
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
                    <Image src={typeInfo.icon} alt={`${type.type.name} icon`} className="w-3 h-3 mr-1" />
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