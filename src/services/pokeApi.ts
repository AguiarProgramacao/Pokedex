import axios from 'axios'
import type {
  PokemonDetails,
  PokemonDetailsApiResponse,
  PokemonListApiResponse,
  PokemonListItem,
} from '../types/pokemon'

const pokeApi = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
})

const extractPokemonIdFromUrl = (url: string): number => {
  const parts = url.split('/').filter(Boolean)
  const id = Number(parts[parts.length - 1])

  if (Number.isNaN(id)) {
    throw new Error(`Invalid pokemon url: ${url}`)
  }

  return id
}

const getPokemonSpriteUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

const getPokemonArtworkUrl = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

const formatDisplayName = (value: string) =>
  value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

const enrichPokemonListWithTypes = async (baseList: PokemonListItem[]) => {
  const chunkSize = 20
  const typesMap = new Map<number, string[]>()

  for (let index = 0; index < baseList.length; index += chunkSize) {
    const chunk = baseList.slice(index, index + chunkSize)

    const chunkResults = await Promise.allSettled(
      chunk.map((pokemon) =>
        pokeApi.get<PokemonDetailsApiResponse>(`/pokemon/${pokemon.id}`),
      ),
    )

    chunkResults.forEach((result) => {
      if (result.status !== 'fulfilled') {
        return
      }

      const { data: pokemonData } = result.value
      const types = pokemonData.types
        .sort((a, b) => a.slot - b.slot)
        .map((entry) => entry.type.name)

      typesMap.set(pokemonData.id, types)
    })
  }

  return baseList.map((pokemon) => ({
    ...pokemon,
    types: typesMap.get(pokemon.id) ?? [],
  }))
}

export const getPokemonList = async (
  limit = 151,
  options?: { includeTypes?: boolean },
): Promise<PokemonListItem[]> => {
  const { data } = await pokeApi.get<PokemonListApiResponse>('/pokemon', {
    params: { limit },
  })

  const baseList = data.results.map((pokemon) => {
    const id = extractPokemonIdFromUrl(pokemon.url)

    return {
      id,
      name: pokemon.name,
      imageUrl: getPokemonSpriteUrl(id),
      detailsUrl: pokemon.url,
      types: [],
    }
  })

  if (options?.includeTypes === false) {
    return baseList
  }

  return enrichPokemonListWithTypes(baseList)
}

export const hydratePokemonListTypes = enrichPokemonListWithTypes

export const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const { data } = await pokeApi.get<PokemonDetailsApiResponse>(`/pokemon/${name}`)

  return {
    id: data.id,
    name: data.name,
    imageUrl:
      data.sprites.other?.['official-artwork']?.front_default ??
      data.sprites.front_default ??
      getPokemonArtworkUrl(data.id),
    height: data.height / 10,
    weight: data.weight / 10,
    types: data.types
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name),
    abilities: data.abilities
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => ({
        name: formatDisplayName(entry.ability.name),
        isHidden: entry.is_hidden,
      })),
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  }
}
