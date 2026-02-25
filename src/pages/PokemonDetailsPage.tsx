import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, Heart, Moon, Sun } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { usePokemonTeam } from '../contexts/PokemonTeamContext'
import { useTheme } from '../contexts/ThemeContext'
import { getPokemonDetails } from '../services/pokeApi'
import type { PokemonDetails } from '../types/pokemon'
import {
  formatPokemonName,
  formatPokemonStatName,
  formatPokemonType,
  getPokemonTheme,
} from '../utils/pokemonTheme'

export function PokemonDetailsPage() {
  const { name } = useParams()
  const { isFavorite, isFull, toggleFavorite } = usePokemonTeam()
  const { isDark, toggleTheme } = useTheme()
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!name) {
      setError('Pokémon não informado.')
      setLoading(false)
      return
    }

    let isMounted = true

    const loadPokemon = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await getPokemonDetails(name)
        if (isMounted) setPokemon(data)
      } catch {
        if (isMounted) {
          setError('Não foi possível carregar os detalhes do Pokémon.')
          setPokemon(null)
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    void loadPokemon()

    return () => {
      isMounted = false
    }
  }, [name])

  const theme = useMemo(() => getPokemonTheme(pokemon?.types[0]), [pokemon?.types])

  if (loading) {
    return (
      <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
        <div className={`h-80 animate-pulse ${isDark ? 'bg-slate-800' : 'bg-slate-300'}`} />
        <div
          className={`-mt-12 mx-auto w-full max-w-3xl rounded-3xl p-6 shadow-lg ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}
        >
          <div className={`h-10 w-40 animate-pulse rounded ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
          <div
            className={`mt-6 h-64 animate-pulse rounded-2xl ${
              isDark ? 'bg-slate-800' : 'bg-slate-100'
            }`}
          />
        </div>
      </div>
    )
  }

  if (error || !pokemon) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center px-4 ${
          isDark ? 'bg-slate-950' : 'bg-slate-100'
        }`}
      >
        <div
          className={`w-full max-w-md rounded-2xl border p-6 text-center shadow-sm ${
            isDark ? 'border-slate-800 bg-slate-900' : 'border-red-200 bg-white'
          }`}
        >
          <p className="mb-4 text-sm text-red-700">{error ?? 'Pokémon não encontrado.'}</p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Voltar para a lista
          </Link>
        </div>
      </div>
    )
  }

  const favorite = isFavorite(pokemon.name)
  const disabledFavorite = isFull && !favorite

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-100'}`}>
      <section
        className={`relative overflow-hidden ${theme.bg} ${theme.textOnBg} bg-linear-to-b from-white/10 via-transparent to-black/20 pb-28`}
      >
        <div className="relative mx-auto w-full max-w-3xl px-4 pt-8 sm:px-6">
          <div className="mb-10 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/95 transition hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Voltar
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white backdrop-blur transition hover:bg-white/30"
                aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
                title={isDark ? 'Modo claro' : 'Modo escuro'}
              >
                {isDark ? (
                  <Sun className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Moon className="h-5 w-5" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  toggleFavorite({
                    id: pokemon.id,
                    name: pokemon.name,
                    imageUrl: pokemon.imageUrl,
                  })
                }
                disabled={disabledFavorite}
                title={disabledFavorite ? 'Seu time já tem 6 Pokémons' : undefined}
                className={`grid h-14 w-14 place-items-center rounded-full backdrop-blur transition ${
                  favorite ? 'bg-white text-red-500' : 'bg-white/25 text-white'
                } ${disabledFavorite ? 'cursor-not-allowed opacity-60' : ''}`}
                aria-label="Favoritar Pokémon"
              >
                <Heart
                  className={`h-7 w-7 ${favorite ? 'fill-current' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="max-w-sm">
              <p className="mb-2 text-lg font-medium text-white/80">
                #{String(pokemon.id).padStart(3, '0')}
              </p>
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
                {formatPokemonName(pokemon.name)}
              </h1>

              <div className="flex flex-wrap gap-2">
                {pokemon.types.map((type) => (
                  <span
                    key={type}
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-wide backdrop-blur"
                  >
                    {formatPokemonType(type)}
                  </span>
                ))}
              </div>
            </div>

            <img
              src={pokemon.imageUrl}
              alt={formatPokemonName(pokemon.name)}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={256}
              height={256}
              className="relative z-30 mx-auto mt-8 h-52 w-52 object-contain drop-shadow-2xl sm:absolute sm:right-6 sm:top-2 sm:mt-0 sm:h-64 sm:w-64"
            />
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-20 pb-10">
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          <div
            className={`rounded-3xl p-6 shadow-xl ${
              isDark
                ? 'bg-slate-900 text-slate-100 shadow-black/30'
                : 'bg-white text-slate-900 shadow-slate-200/80'
            }`}
          >
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              <div className={`rounded-2xl ${theme.lightBg} p-4`}>
                <p className={`mb-1 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Altura
                </p>
                <p className={`text-2xl font-bold ${theme.accent}`}>
                  {pokemon.height.toFixed(1)}m
                </p>
              </div>
              <div className={`rounded-2xl ${theme.lightBg} p-4`}>
                <p className={`mb-1 text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
                  Peso
                </p>
                <p className={`text-2xl font-bold ${theme.accent}`}>
                  {pokemon.weight.toFixed(1)}kg
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="mb-3 text-2xl font-bold">Habilidades</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.name}
                    className={`rounded-xl px-3 py-2 text-sm font-semibold ${theme.badge}`}
                  >
                    {ability.name}
                    {ability.isHidden ? ' (Oculta)' : ''}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold">Estatísticas Base</h2>
              <div className="space-y-3">
                {pokemon.stats.map((stat) => (
                  <div
                    key={stat.name}
                    className="grid grid-cols-[100px_44px_1fr] items-center gap-3 sm:grid-cols-[140px_52px_1fr]"
                  >
                    <span className={`${isDark ? 'text-slate-300' : 'text-slate-600'} truncate text-sm`}>
                      {formatPokemonStatName(stat.name)}
                    </span>
                    <span className={`${isDark ? 'text-slate-100' : 'text-slate-800'} text-right text-sm font-bold`}>
                      {stat.value}
                    </span>
                    <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <div
                        className={`h-full rounded-full ${theme.progress}`}
                        style={{ width: `${Math.min(stat.value, 180) / 1.8}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
