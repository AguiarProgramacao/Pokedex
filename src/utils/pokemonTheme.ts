export interface PokemonTheme {
  bg: string
  lightBg: string
  badge: string
  accent: string
  textOnBg: string
  progress: string
}

const typeThemes: Record<string, PokemonTheme> = {
  normal: {
    bg: 'bg-stone-400',
    lightBg: 'bg-stone-100',
    badge: 'bg-stone-200 text-stone-800',
    accent: 'text-stone-700',
    textOnBg: 'text-white',
    progress: 'bg-stone-500',
  },
  fire: {
    bg: 'bg-orange-500',
    lightBg: 'bg-orange-50',
    badge: 'bg-orange-100 text-orange-800',
    accent: 'text-orange-700',
    textOnBg: 'text-white',
    progress: 'bg-orange-500',
  },
  water: {
    bg: 'bg-sky-500',
    lightBg: 'bg-sky-50',
    badge: 'bg-sky-100 text-sky-800',
    accent: 'text-sky-700',
    textOnBg: 'text-white',
    progress: 'bg-sky-500',
  },
  electric: {
    bg: 'bg-amber-400',
    lightBg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-900',
    accent: 'text-amber-700',
    textOnBg: 'text-slate-900',
    progress: 'bg-amber-500',
  },
  grass: {
    bg: 'bg-emerald-500',
    lightBg: 'bg-emerald-50',
    badge: 'bg-emerald-100 text-emerald-800',
    accent: 'text-emerald-700',
    textOnBg: 'text-white',
    progress: 'bg-emerald-500',
  },
  ice: {
    bg: 'bg-cyan-400',
    lightBg: 'bg-cyan-50',
    badge: 'bg-cyan-100 text-cyan-900',
    accent: 'text-cyan-700',
    textOnBg: 'text-slate-900',
    progress: 'bg-cyan-500',
  },
  fighting: {
    bg: 'bg-red-600',
    lightBg: 'bg-red-50',
    badge: 'bg-red-100 text-red-800',
    accent: 'text-red-700',
    textOnBg: 'text-white',
    progress: 'bg-red-500',
  },
  poison: {
    bg: 'bg-purple-500',
    lightBg: 'bg-purple-50',
    badge: 'bg-purple-100 text-purple-800',
    accent: 'text-purple-700',
    textOnBg: 'text-white',
    progress: 'bg-purple-500',
  },
  ground: {
    bg: 'bg-amber-600',
    lightBg: 'bg-amber-50',
    badge: 'bg-amber-100 text-amber-900',
    accent: 'text-amber-700',
    textOnBg: 'text-white',
    progress: 'bg-amber-600',
  },
  flying: {
    bg: 'bg-indigo-400',
    lightBg: 'bg-indigo-50',
    badge: 'bg-indigo-100 text-indigo-800',
    accent: 'text-indigo-700',
    textOnBg: 'text-white',
    progress: 'bg-indigo-500',
  },
  psychic: {
    bg: 'bg-pink-500',
    lightBg: 'bg-pink-50',
    badge: 'bg-pink-100 text-pink-800',
    accent: 'text-pink-700',
    textOnBg: 'text-white',
    progress: 'bg-pink-500',
  },
  bug: {
    bg: 'bg-lime-500',
    lightBg: 'bg-lime-50',
    badge: 'bg-lime-100 text-lime-900',
    accent: 'text-lime-700',
    textOnBg: 'text-slate-900',
    progress: 'bg-lime-500',
  },
  rock: {
    bg: 'bg-yellow-700',
    lightBg: 'bg-yellow-50',
    badge: 'bg-yellow-100 text-yellow-900',
    accent: 'text-yellow-800',
    textOnBg: 'text-white',
    progress: 'bg-yellow-700',
  },
  ghost: {
    bg: 'bg-violet-700',
    lightBg: 'bg-violet-50',
    badge: 'bg-violet-100 text-violet-900',
    accent: 'text-violet-700',
    textOnBg: 'text-white',
    progress: 'bg-violet-600',
  },
  dragon: {
    bg: 'bg-indigo-700',
    lightBg: 'bg-indigo-50',
    badge: 'bg-indigo-100 text-indigo-900',
    accent: 'text-indigo-700',
    textOnBg: 'text-white',
    progress: 'bg-indigo-600',
  },
  dark: {
    bg: 'bg-slate-700',
    lightBg: 'bg-slate-100',
    badge: 'bg-slate-200 text-slate-900',
    accent: 'text-slate-700',
    textOnBg: 'text-white',
    progress: 'bg-slate-600',
  },
  steel: {
    bg: 'bg-zinc-500',
    lightBg: 'bg-zinc-100',
    badge: 'bg-zinc-200 text-zinc-900',
    accent: 'text-zinc-700',
    textOnBg: 'text-white',
    progress: 'bg-zinc-500',
  },
  fairy: {
    bg: 'bg-rose-400',
    lightBg: 'bg-rose-50',
    badge: 'bg-rose-100 text-rose-900',
    accent: 'text-rose-700',
    textOnBg: 'text-white',
    progress: 'bg-rose-500',
  },
}

const fallbackTheme: PokemonTheme = {
  bg: 'bg-red-500',
  lightBg: 'bg-red-50',
  badge: 'bg-red-100 text-red-800',
  accent: 'text-red-700',
  textOnBg: 'text-white',
  progress: 'bg-red-500',
}

export const getPokemonTheme = (typeName?: string): PokemonTheme =>
  (typeName && typeThemes[typeName]) || fallbackTheme

export const formatPokemonName = (name: string) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

export const formatPokemonType = (type: string) => type.toUpperCase()

export const formatPokemonStatName = (statName: string) => {
  const labels: Record<string, string> = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    speed: 'Velocidade',
  }

  return labels[statName] ?? formatPokemonName(statName)
}
