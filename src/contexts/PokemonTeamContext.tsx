import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export interface TeamPokemon {
  id: number
  name: string
  imageUrl: string
}

interface PokemonTeamContextValue {
  team: TeamPokemon[]
  isFavorite: (pokemonName: string) => boolean
  toggleFavorite: (pokemon: TeamPokemon) => void
  moveTeamPokemon: (pokemonName: string, direction: 'left' | 'right') => void
  isFull: boolean
  maxTeamSize: number
}

const MAX_TEAM_SIZE = 6
const STORAGE_KEY = 'pokemon-team'

const PokemonTeamContext = createContext<PokemonTeamContextValue | null>(null)

export function PokemonTeamProvider({ children }: { children: ReactNode }) {
  const [team, setTeam] = useState<TeamPokemon[]>(() => {
    if (typeof window === 'undefined') {
      return []
    }

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return []

      const parsed = JSON.parse(raw) as TeamPokemon[]
      if (!Array.isArray(parsed)) return []

      return parsed.slice(0, MAX_TEAM_SIZE)
    } catch {
      return []
    }
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(team))
  }, [team])

  const value = useMemo<PokemonTeamContextValue>(
    () => ({
      team,
      isFavorite: (pokemonName: string) =>
        team.some((pokemon) => pokemon.name === pokemonName),
      toggleFavorite: (pokemon: TeamPokemon) => {
        setTeam((currentTeam) => {
          const alreadyFavorite = currentTeam.some(
            (teamPokemon) => teamPokemon.name === pokemon.name,
          )

          if (alreadyFavorite) {
            return currentTeam.filter(
              (teamPokemon) => teamPokemon.name !== pokemon.name,
            )
          }

          if (currentTeam.length >= MAX_TEAM_SIZE) {
            return currentTeam
          }

          return [...currentTeam, pokemon]
        })
      },
      moveTeamPokemon: (pokemonName, direction) => {
        setTeam((currentTeam) => {
          const currentIndex = currentTeam.findIndex(
            (teamPokemon) => teamPokemon.name === pokemonName,
          )

          if (currentIndex < 0) return currentTeam

          const targetIndex =
            direction === 'left' ? currentIndex - 1 : currentIndex + 1

          if (targetIndex < 0 || targetIndex >= currentTeam.length) {
            return currentTeam
          }

          const nextTeam = [...currentTeam]
          ;[nextTeam[currentIndex], nextTeam[targetIndex]] = [
            nextTeam[targetIndex],
            nextTeam[currentIndex],
          ]

          return nextTeam
        })
      },
      isFull: team.length >= MAX_TEAM_SIZE,
      maxTeamSize: MAX_TEAM_SIZE,
    }),
    [team],
  )

  return (
    <PokemonTeamContext.Provider value={value}>
      {children}
    </PokemonTeamContext.Provider>
  )
}

export function usePokemonTeam() {
  const context = useContext(PokemonTeamContext)

  if (!context) {
    throw new Error('usePokemonTeam must be used within PokemonTeamProvider')
  }

  return context
}
