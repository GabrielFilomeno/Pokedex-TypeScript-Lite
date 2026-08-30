
export interface PokemonPokeApi {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: PokemonForm[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: PokemonCries;
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: PokemonPastType[];
  past_abilities: PokemonPastAbility[];
}

interface NamedAPIResource {
  name: string;
  url: string;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonForm {
  name: string;
  url: string;
}

interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface PokemonHeldItemVersion {
  rarity: number;
  version: NamedAPIResource;
}

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonMoveVersion {
  level_learned_at: number;
  version_group: NamedAPIResource;
  move_learn_method: NamedAPIResource;
  order: number | null;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface SpriteSet {
  back_default: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

interface GenerationISprites {
  "red-blue": SpriteSet & { back_gray?: string | null; front_gray?: string | null };
  yellow: SpriteSet & { back_gray?: string | null; front_gray?: string | null };
}

interface GenerationIISprites {
  crystal: SpriteSet;
  gold: SpriteSet;
  silver: SpriteSet;
}

interface GenerationIIISprites {
  emerald: Pick<SpriteSet, "front_default" | "front_shiny">;
  "firered-leafgreen": SpriteSet;
  "ruby-sapphire": SpriteSet;
}

interface GenerationIVSprites {
  "diamond-pearl": SpriteSet;
  "heartgold-soulsilver": SpriteSet;
  platinum: SpriteSet;
}

interface GenerationVSprites {
  "black-white": SpriteSet & {
    animated: SpriteSet;
  };
}

interface GenerationVISprites {
  "omegaruby-alphasapphire": Omit<SpriteSet, "back_default" | "back_female" | "back_shiny" | "back_shiny_female">;
  "x-y": Omit<SpriteSet, "back_default" | "back_female" | "back_shiny" | "back_shiny_female">;
}

interface GenerationVIISprites {
  icons: {
    front_default: string | null;
    front_female: string | null;
  };
  "ultra-sun-ultra-moon": Omit<SpriteSet, "back_default" | "back_female" | "back_shiny" | "back_shiny_female">;
}

interface GenerationVIIISprites {
  icons: {
    front_default: string | null;
    front_female: string | null;
  };
}

interface VersionSprites {
  "generation-i": GenerationISprites;
  "generation-ii": GenerationIISprites;
  "generation-iii": GenerationIIISprites;
  "generation-iv": GenerationIVSprites;
  "generation-v": GenerationVSprites;
  "generation-vi": GenerationVISprites;
  "generation-vii": GenerationVIISprites;
  "generation-viii": GenerationVIIISprites;
}

interface OtherSprites {
  dream_world: {
    front_default: string | null;
    front_female: string | null;
  };
  home: SpriteSet;
  "official-artwork": Pick<SpriteSet, "front_default" | "front_shiny">;
  showdown: SpriteSet;
}

interface PokemonSprites extends SpriteSet {
  other: OtherSprites;
  versions: VersionSprites;
}

interface PokemonCries {
  latest: string;
  legacy: string;
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonPastType {
  generation: NamedAPIResource;
  types: PokemonType[];
}

interface PokemonPastAbilityEntry {
  ability: NamedAPIResource | null;
  is_hidden: boolean;
  slot: number;
}

interface PokemonPastAbility {
  generation: NamedAPIResource;
  abilities: PokemonPastAbilityEntry[];
}
