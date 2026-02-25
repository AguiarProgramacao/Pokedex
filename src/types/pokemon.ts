export interface PokemonListApiItem {
  name: string
  url: string
}

export interface PokemonListApiResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListApiItem[]
}

export interface PokemonListItem {
  id: number
  name: string
  imageUrl: string
  detailsUrl: string
  types: string[]
}

export interface PokemonTypeEntry {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonAbilityEntry {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonStatEntry {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonDetailsApiResponse {
  id: number
  name: string
  height: number
  weight: number
  abilities: PokemonAbilityEntry[]
  stats: PokemonStatEntry[]
  types: PokemonTypeEntry[]
  sprites: {
    other?: {
      'official-artwork'?: {
        front_default?: string | null
      }
    }
    front_default?: string | null
  }
}

export interface PokemonDetails {
  id: number
  name: string
  imageUrl: string
  height: number
  weight: number
  types: string[]
  abilities: Array<{
    name: string
    isHidden: boolean
  }>
  stats: Array<{
    name: string
    value: number
  }>
}
