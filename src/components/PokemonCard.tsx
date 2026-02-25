import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePokemonTeam } from '../contexts/PokemonTeamContext'
import { useTheme } from '../contexts/ThemeContext'
import type { PokemonListItem } from '../types/pokemon'
import { formatPokemonName, formatPokemonType, getPokemonTheme } from '../utils/pokemonTheme'

interface PokemonCardProps {
  pokemon: PokemonListItem
  index?: number
}

export function PokemonCard({ pokemon, index = 0 }: PokemonCardProps) {
  const { isFavorite, isFull, toggleFavorite } = usePokemonTeam()
  const { isDark } = useTheme()
  const favorite = isFavorite(pokemon.name)
  const disabled = isFull && !favorite
  const isAboveTheFold = index < 4

  return (
    <article
      className="group relative card-enter"
      style={{ animationDelay: `${Math.min(index, 20) * 35}ms` }}
    >
      <button
        type="button"
        onClick={() =>
          toggleFavorite({
            id: pokemon.id,
            name: pokemon.name,
            imageUrl: pokemon.imageUrl,
          })
        }
        disabled={disabled}
        aria-label={favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        title={disabled ? 'Seu time já tem 6 Pokémons' : undefined}
        className={`absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full border shadow-sm transition sm:right-4 sm:top-4 sm:h-9 sm:w-9 ${
          favorite
            ? 'border-red-500 bg-red-500 text-white'
            : 'border-slate-200 bg-white text-slate-400 hover:border-red-200 hover:text-red-500'
        } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
      >
        <Heart
          className={`h-4 w-4 sm:h-5 sm:w-5 ${favorite ? 'fill-current' : ''}`}
          aria-hidden="true"
        />
      </button>

      <Link
        to={`/pokemon/${pokemon.name}`}
        className={`flex min-h-60 w-full flex-col items-center justify-center rounded-2xl border p-3 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:min-h-72 sm:rounded-3xl sm:p-4 ${
          isDark
            ? 'border-slate-800 bg-slate-900 hover:border-slate-700'
            : 'border-slate-200 bg-white hover:border-red-100'
        }`}
      >
        <img
          src={pokemon.imageUrl}
          alt={formatPokemonName(pokemon.name)}
          loading={isAboveTheFold ? 'eager' : 'lazy'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
          width={144}
          height={144}
          className="mb-3 h-24 w-24 object-contain transition group-hover:scale-105 sm:mb-4 sm:h-36 sm:w-36"
        />

        <p className={`text-base font-semibold sm:text-lg ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {formatPokemonName(pokemon.name)}
        </p>

        {pokemon.types.length > 0 ? (
          <div className="mt-2 flex flex-wrap justify-center gap-1 sm:mt-3 sm:gap-1.5">
            {pokemon.types.slice(0, 2).map((type) => (
              <span
                key={`${pokemon.name}-${type}`}
                className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold tracking-wide sm:px-2 sm:text-[10px] ${getPokemonTheme(type).badge}`}
              >
                {formatPokemonType(type)}
              </span>
            ))}
          </div>
        ) : null}
      </Link>
    </article>
  )
}
