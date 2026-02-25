import { useEffect, useMemo, useState } from 'react'
import { Moon, RefreshCw, Sun } from 'lucide-react'
import Pokebola from "../assets/pokebola.png"
import { PokemonCard } from '../components/PokemonCard'
import { PokemonTeamAccordion } from '../components/PokemonTeamAccordion'
import { usePokemonTeam } from '../contexts/PokemonTeamContext'
import { useTheme } from '../contexts/ThemeContext'
import { getPokemonList, hydratePokemonListTypes } from '../services/pokeApi'
import type { PokemonListItem } from '../types/pokemon'
import { formatPokemonType, getPokemonTheme } from '../utils/pokemonTheme'

export function HomePage() {
  const { team } = usePokemonTeam()
  const { isDark, toggleTheme } = useTheme()
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)
  const [isTeamOpen, setIsTeamOpen] = useState(true)
  const [selectedType, setSelectedType] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadPokemons = async () => {
      setLoading(true)
      setError(null)

      try {
        const baseList = await getPokemonList(151, { includeTypes: false })
        if (!isMounted) return

        setPokemons(baseList)
        setLoading(false)

        const enrichedList = await hydratePokemonListTypes(baseList)
        if (isMounted) {
          setPokemons(enrichedList)
        }
      } catch {
        if (isMounted) {
          setError('Não foi possível carregar os Pokémons. Tente novamente.')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    void loadPokemons()

    return () => {
      isMounted = false
    }
  }, [refreshKey])

  useEffect(() => {
    if (team.length > 0) {
      setIsTeamOpen(true)
    }
  }, [team.length])

  const pokemonTypes = useMemo(() => {
    const types = new Set<string>()
    pokemons.forEach((pokemon) => {
      pokemon.types.forEach((type) => types.add(type))
    })

    return Array.from(types).sort((a, b) => a.localeCompare(b))
  }, [pokemons])

  const filteredPokemons = useMemo(() => {
    const term = search.trim().toLowerCase()
    return pokemons.filter((pokemon) => {
      const matchesName = !term || pokemon.name.toLowerCase().includes(term)
      const matchesType =
        !selectedType || pokemon.types.includes(selectedType)

      return matchesName && matchesType
    })
  }, [pokemons, search, selectedType])

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
      }`}
    >
      <header
        className={`sticky top-0 z-10 border-b backdrop-blur ${
          isDark
            ? 'border-slate-800/80 bg-slate-900/90'
            : 'border-slate-200/80 bg-white/90'
        }`}
      >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr] items-center gap-x-3 gap-y-3 px-4 py-3 sm:flex sm:gap-3 sm:px-6 sm:py-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white sm:h-12 sm:w-12">
            <img
              src={Pokebola}
              alt="pokebola"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={48}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-xl font-bold tracking-tight text-red-500 sm:text-2xl">
              Pokédex
            </h1>
          </div>

          <div className="col-span-2 flex w-full items-center gap-2 sm:ml-auto sm:col-span-1 sm:max-w-3xl sm:gap-3">
            <label htmlFor="search-pokemon" className="sr-only">
              Buscar Pokémon
            </label>
            <input
              id="search-pokemon"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome..."
              className={`h-11 w-full min-w-0 rounded-2xl border px-3 text-sm outline-none ring-0 placeholder:text-slate-400 sm:h-12 sm:px-4 ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-100 focus:border-red-400'
                  : 'border-slate-200 bg-slate-50 text-slate-900 focus:border-red-300 focus:bg-white'
              }`}
            />
            <button
              type="button"
              onClick={toggleTheme}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition sm:h-12 sm:w-12 ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-amber-300 hover:border-amber-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
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
              onClick={() => setRefreshKey((current) => current + 1)}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border transition sm:h-12 sm:w-12 ${
                isDark
                  ? 'border-slate-700 bg-slate-800 text-slate-300 hover:border-red-400 hover:text-red-300'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-red-200 hover:text-red-500'
              }`}
              aria-label="Atualizar lista"
              title="Atualizar lista"
            >
              <RefreshCw
                className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-3 py-5 sm:px-6 sm:py-8">
        <PokemonTeamAccordion
          isOpen={isTeamOpen}
          onToggle={() => setIsTeamOpen((current) => !current)}
        />

        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <p className={`mb-4 text-sm sm:mb-6 sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          {loading
            ? 'Carregando Pokémons...'
            : `${filteredPokemons.length} Pokémons encontrados`}
        </p>

        {!loading && pokemonTypes.length > 0 ? (
          <div className="mb-5 sm:mb-6">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              <button
                type="button"
                onClick={() => setSelectedType(null)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold tracking-wide transition ${
                  selectedType === null
                    ? 'border-red-500 bg-red-500 text-white'
                    : isDark
                      ? 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                TODOS
              </button>

              {pokemonTypes.map((type) => {
                const typeTheme = getPokemonTheme(type)
                const active = selectedType === type

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold tracking-wide transition ${
                      active
                        ? `${typeTheme.badge} ring-2 ring-offset-1 ${isDark ? 'ring-offset-slate-950' : 'ring-offset-slate-100'}`
                        : isDark
                          ? 'bg-slate-900 text-slate-300 ring-1 ring-slate-700 hover:ring-slate-600'
                          : `${typeTheme.badge} opacity-80 hover:opacity-100`
                    }`}
                  >
                    {formatPokemonType(type)}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {loading && pokemons.length === 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`h-72 animate-pulse rounded-3xl border ${
                  isDark
                    ? 'border-slate-800 bg-slate-900'
                    : 'border-slate-200 bg-white'
                }`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredPokemons.map((pokemon, index) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && filteredPokemons.length === 0 ? (
          <div
            className={`mt-6 rounded-2xl border px-4 py-6 text-center text-sm ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-slate-400'
                : 'border-slate-200 bg-white text-slate-500'
            }`}
          >
            Nenhum Pokémon encontrado para "{search}".
          </div>
        ) : null}
      </main>
    </div>
  )
}
