import type { PokemonPokeApi } from '../shared/interfaces/poke-api.interface.js';
import type { Pokemon } from '../models/pokemon.model.js';

export class PokemonMapper {
  public static toModel(apiData: PokemonPokeApi): Pokemon {
    return {
      id: apiData.id,
      name: apiData.name,
      types: apiData.types.map((t) => t.type.name) ?? [],
      // A PokéAPI retorna altura em decímetros (ex: 7 dm = 0.7 m)
      height: apiData.height / 10,
      // A PokéAPI retorna peso em hectogramas (ex: 69 hg = 6.9 kg)
      weight: apiData.weight / 10,
    };
  }
}