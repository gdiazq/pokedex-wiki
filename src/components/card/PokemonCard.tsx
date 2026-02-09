import React, { useMemo, useState } from 'react';
import { Card, CardBody, CardFooter, Button } from '@nextui-org/react';
import { RotateCw, Info } from 'lucide-react';
import { PokemonDetails } from '@/types/pokemon';
import { POKEMON_TYPE_COLORS } from '@/constants/pokemonTypes';

export function PokemonCard({ pokemon }: { pokemon: PokemonDetails }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);
  const primaryType = pokemon.types?.[0]?.type?.name || 'normal';
  const typeColor = useMemo(
    () => POKEMON_TYPE_COLORS[primaryType] || 'bg-zinc-500',
    [primaryType]
  );

  return (
    <div className="relative h-[410px] w-full [perspective:1200px]">
      <div
        className={`relative h-full w-full rounded-3xl transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <Card className="absolute h-full w-full overflow-hidden border border-slate-200/70 bg-white/90 shadow-xl [backface-visibility:hidden] dark:border-slate-700/70 dark:bg-slate-900/80">
          <CardBody className="relative overflow-visible p-4">
            <div className="absolute inset-x-5 top-4 h-20 rounded-2xl bg-gradient-to-r from-sky-200/70 via-indigo-200/70 to-cyan-200/70 blur-sm dark:from-sky-900/40 dark:via-indigo-900/40 dark:to-cyan-900/40" />
            <div className="relative flex h-full flex-col items-center justify-between">
              <div className="mt-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
                #{pokemon.id}
              </div>
              <div className="my-4 flex h-48 w-48 items-center justify-center rounded-full bg-white/75 p-2 shadow-md dark:bg-slate-800/70">
                <img
                  alt={`${pokemon.name} sprite`}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_10px_18px_rgba(2,6,23,0.25)]"
                  src={
                    pokemon.sprites?.other?.['official-artwork']?.front_default ||
                    pokemon.sprites?.other?.dream_world?.front_default ||
                    pokemon.sprites?.front_default ||
                    ''
                  }
                  loading="lazy"
                />
              </div>
              <div className="w-full rounded-2xl border border-slate-200 bg-white/75 px-3 py-2 text-center dark:border-slate-700 dark:bg-slate-900/70">
                <h2 className="text-lg font-black capitalize tracking-wide text-black dark:text-white">
                  {pokemon.name}
                </h2>
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/80 bg-white/80 px-3 py-3 dark:border-slate-700/80 dark:bg-slate-900/80">
            <div className="flex max-w-[78%] flex-wrap gap-1.5">
              {pokemon.types.map((type) => {
                const typeName = type.type.name;
                const chipColor = POKEMON_TYPE_COLORS[typeName] || 'bg-zinc-500';
                return (
                  <div
                    key={typeName}
                    className={`${chipColor} inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold capitalize text-black dark:text-white`}
                  >
                    <img src={`/pokemon-types/${typeName}.svg`} alt={`${typeName} icon`} className="h-3.5 w-3.5" />
                    <span>{typeName}</span>
                  </div>
                );
              })}
            </div>
            <Button
              isIconOnly
              aria-label={`View details of ${pokemon.name}`}
              className="bg-transparent text-black hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
              onClick={handleFlip}
            >
              <Info className="h-5 w-5" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="absolute h-full w-full border border-slate-200/70 bg-white/90 shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-slate-700/70 dark:bg-slate-900/85">
          <CardBody className="flex flex-col justify-center gap-2 p-5">
            <h2 className="text-center text-2xl font-black capitalize">{pokemon.name}</h2>
            <p className="text-sm"><strong>Type:</strong> {pokemon.types.map((t) => t.type.name).join(', ')}</p>
            <p className="text-sm"><strong>Height:</strong> {pokemon.height / 10} m</p>
            <p className="text-sm"><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
            <p className="text-sm"><strong>Abilities:</strong> {pokemon.abilities.map((a) => a.ability.name).join(', ')}</p>
            {pokemon.description && (
              <p className="mt-2 text-center text-xs opacity-80">{pokemon.description}</p>
            )}
          </CardBody>
          <CardFooter className="justify-center border-t border-slate-200/80 bg-white/80 dark:border-slate-700/80 dark:bg-slate-900/80">
            <Button
              className={`${typeColor} font-semibold text-black dark:text-white`}
              endContent={<RotateCw className="h-4 w-4" />}
              onClick={handleFlip}
            >
              Volver
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
