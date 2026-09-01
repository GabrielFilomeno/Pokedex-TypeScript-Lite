import { Pokemon } from "../models/pokemon.model.js";
import { PokemonMapper } from "../utils/pokemon-mapper.js";
import { PokemonNotFoundError } from "../shared/errors/pokemon-not-found.error.js";
import { IdOrNameNotSendError } from "../shared/errors/id-or-name-not-send.error.js";
import type { PokemonPokeApi } from "../shared/interfaces/poke-api.interface.js";
import { PokeApiError } from "../shared/errors/poke-api.error.js";

export class PokeApiService {
  private readonly baseUrl = "https://pokeapi.co/api/v2/pokemon";

  async getPokemonByNameOrId(identifier: string | number): Promise<Pokemon> {
    const cleanIdentifier = String(identifier).trim().toLowerCase();

    if (!cleanIdentifier) {
      throw new IdOrNameNotSendError();
    }

    try {
      const response = await fetch(`${this.baseUrl}/${encodeURIComponent(cleanIdentifier)}`);

      if (response.status === 404) {
        const idNumber = Number(cleanIdentifier);
        if (!isNaN(idNumber) && Number.isInteger(idNumber) && idNumber > 0) {
          throw new PokemonNotFoundError(idNumber);
        }
        throw new PokemonNotFoundError(undefined, cleanIdentifier);
      }

      if (!response.ok) {
        throw new PokeApiError(response.status, response.statusText);
      }

      const data = (await response.json()) as PokemonPokeApi;
      return PokemonMapper.toModel(data);
    } catch (error) {
      if (error instanceof PokemonNotFoundError || error instanceof IdOrNameNotSendError || error instanceof PokeApiError) {
        throw error;
      }

      if (error instanceof TypeError && error.message.toLowerCase().includes("fetch")) {
        throw new PokeApiError(502, "Não foi possível conectar à PokeAPI. Verifique sua conexão com a internet.");
      }

      throw error;
    }
  }
}
