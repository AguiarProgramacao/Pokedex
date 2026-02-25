import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Shield,
  Sword,
  UsersRound,
  Wind,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePokemonTeam } from '../contexts/PokemonTeamContext'
import { useTheme } from '../contexts/ThemeContext'
import { getPokemonDetails } from '../services/pokeApi'
import { formatPokemonName } from '../utils/pokemonTheme'

interface PokemonTeamAccordionProps {
  isOpen: boolean
  onToggle: () => void
}

export function PokemonTeamAccordion({
  isOpen,
  onToggle,
}: PokemonTeamAccordionProps) {
  const { team, maxTeamSize, toggleFavorite, moveTeamPokemon } = usePokemonTeam()
  const { isDark } = useTheme()
  const [summary, setSummary] = useState<{
    hp: number
    attack: number
    defense: number
    speed: number
  } | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)

  useEffect(() => {
    if (team.length === 0) {
      setSummary(null)
      setSummaryLoading(false)
      return
    }

    let isMounted = true

    const loadSummary = async () => {
      setSummaryLoading(true)

      try {
        const details = await Promise.all(
          team.map((pokemon) => getPokemonDetails(pokemon.name)),
        )

        const total = details.reduce(
          (acc, pokemon) => {
            const getStat = (name: string) =>
              pokemon.stats.find((stat) => stat.name === name)?.value ?? 0

            acc.hp += getStat('hp')
            acc.attack += getStat('attack')
            acc.defense += getStat('defense')
            acc.speed += getStat('speed')
            return acc
          },
          { hp: 0, attack: 0, defense: 0, speed: 0 },
        )

        const divisor = details.length || 1
        const nextSummary = {
          hp: Math.round(total.hp / divisor),
          attack: Math.round(total.attack / divisor),
          defense: Math.round(total.defense / divisor),
          speed: Math.round(total.speed / divisor),
        }

        if (isMounted) {
          setSummary(nextSummary)
        }
      } catch {
        if (isMounted) {
          setSummary(null)
        }
      } finally {
        if (isMounted) {
          setSummaryLoading(false)
        }
      }
    }

    void loadSummary()

    return () => {
      isMounted = false
    }
  }, [team])

  const summaryCards = useMemo(
    () => [
      { key: 'hp', label: 'HP', value: summary?.hp ?? 0, icon: Activity },
      { key: 'atk', label: 'ATQ', value: summary?.attack ?? 0, icon: Sword },
      { key: 'def', label: 'DEF', value: summary?.defense ?? 0, icon: Shield },
      { key: 'spd', label: 'VEL', value: summary?.speed ?? 0, icon: Wind },
    ],
    [summary],
  )

  if (team.length === 0) {
    return null
  }

  const emptySlots = Math.max(0, maxTeamSize - team.length)

  return (
    <section
      className={`mb-5 overflow-hidden rounded-3xl border text-white shadow-lg sm:mb-6 ${
        isDark
          ? 'border-red-400/40 bg-gradient-to-b from-red-700 to-red-900 shadow-black/30'
          : 'border-red-400/70 bg-gradient-to-b from-red-500 to-red-600 shadow-red-200'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-start justify-between gap-3 px-3 py-3 text-left sm:items-center sm:gap-4 sm:px-5 sm:py-4 ${
          isDark ? 'bg-black/10' : ''
        }`}
        aria-expanded={isOpen}
        aria-controls="pokemon-team-panel"
      >
        <div className="flex min-w-0 items-start gap-3 sm:items-center">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/20 text-lg sm:h-10 sm:w-10">
            <UsersRound className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-bold sm:text-lg">Meu Time Pokémon</p>
            <p className="text-xs text-white/90 sm:text-sm">
              {team.length}/{maxTeamSize} Pokémons selecionados
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {summaryCards.map((item) => {
                const Icon = item.icon
                return (
                  <span
                    key={item.key}
                    className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[9px] font-bold tracking-wide text-white/95 ring-1 ring-white/10 sm:text-[10px]"
                  >
                    <Icon className="h-3 w-3" aria-hidden="true" />
                    {item.label}
                    <span className="min-w-5 text-right">
                      {summaryLoading ? '...' : item.value}
                    </span>
                  </span>
                )
              })}
            </div>
          </div>
        </div>

        <ChevronUp
          className={`mt-1 h-5 w-5 shrink-0 transition-transform sm:mt-0 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id="pokemon-team-panel"
        className={`overflow-hidden border-t border-white/20 transition-all duration-300 ease-out ${isOpen ? 'max-h-[780px] opacity-100 sm:max-h-[420px]' : 'max-h-0 opacity-0'}`}
      >
        <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3 sm:p-3 lg:grid-cols-6">
          {team.map((pokemon, index) => (
            <div key={pokemon.name} className="group relative">
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  toggleFavorite(pokemon)
                }}
                className="absolute -right-1.5 -top-1.5 z-20 grid h-5 w-5 place-items-center rounded-full border border-white/50 bg-red-500 text-white opacity-100 shadow transition duration-150 hover:bg-red-400 sm:-right-2 sm:-top-2 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
                aria-label={`Remover ${formatPokemonName(pokemon.name)} do time`}
                title="Remover do time"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>

              <div className="absolute left-1.5 top-1.5 z-20 flex gap-1 opacity-100 transition duration-150 sm:left-2 sm:top-2 sm:opacity-0 sm:group-hover:opacity-100 focus-within:opacity-100">
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    moveTeamPokemon(pokemon.name, 'left')
                  }}
                  disabled={index === 0}
                  className="grid h-5 w-5 place-items-center rounded-full bg-white/90 text-red-600 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                  aria-label={`Mover ${formatPokemonName(pokemon.name)} para a esquerda`}
                  title="Mover para a esquerda"
                >
                  <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault()
                    event.stopPropagation()
                    moveTeamPokemon(pokemon.name, 'right')
                  }}
                  disabled={index === team.length - 1}
                  className="grid h-5 w-5 place-items-center rounded-full bg-white/90 text-red-600 shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:h-6 sm:w-6"
                  aria-label={`Mover ${formatPokemonName(pokemon.name)} para a direita`}
                  title="Mover para a direita"
                >
                  <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
                </button>
              </div>

              <Link
                to={`/pokemon/${pokemon.name}`}
                className={`flex min-h-32 flex-col items-center justify-center rounded-2xl p-2.5 text-center ring-1 transition sm:min-h-40 sm:p-3 ${
                  isDark
                    ? 'bg-white/8 ring-white/10 hover:bg-white/12'
                    : 'bg-white/10 ring-white/10 hover:bg-white/15'
                }`}
              >
                <img
                  src={pokemon.imageUrl}
                  alt={formatPokemonName(pokemon.name)}
                  className="mb-1.5 h-16 w-16 object-contain sm:mb-2 sm:h-24 sm:w-24"
                />
                <span className="text-xs font-semibold sm:text-sm">
                  {formatPokemonName(pokemon.name)}
                </span>
              </Link>
            </div>
          ))}

          {Array.from({ length: emptySlots }).map((_, index) => (
            <div
              key={`empty-slot-${index}`}
              className={`grid min-h-32 place-items-center rounded-2xl border-2 border-dashed text-xl sm:min-h-40 sm:text-2xl ${
                isDark
                  ? 'border-white/15 bg-white/3 text-white/25'
                  : 'border-white/25 bg-white/5 text-white/40'
              }`}
              aria-hidden="true"
            >
              ?
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
