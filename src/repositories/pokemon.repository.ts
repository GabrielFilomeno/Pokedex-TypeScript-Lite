import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { Pokemon } from "../models/pokemon.model.js";
import { PokemonAlreadyExistsError } from "../shared/errors/pokemon-already-exists.error.js";
import { PokemonNotFoundError } from "../shared/errors/pokemon-not-found.error.js";
import { IdOrNameNotSendError } from "../shared/errors/id-or-name-not-send.error.js";

const FILE_PATH = path.resolve(process.cwd(), "pc_box.json");

export class BoxService {
  private pokemons: Pokemon[] = [];

  async init(): Promise<void> {
    if (existsSync(FILE_PATH)) {
      try {
        const data = await readFile(FILE_PATH, "utf-8");
        this.pokemons = data.trim() ? JSON.parse(data) : [];
      } catch (error) {
        console.warn("⚠️ Arquivo de dados inválido ou corrompido. Reiniciando memória local.");
        this.pokemons = [];
        await this.saveToFile();
      }
    } else {
      this.pokemons = [];
      await this.saveToFile();
    }
  }

  getAll(): Pokemon[] {
    return this.pokemons;
  }

  async add(pokemon: Pokemon): Promise<void> {
    const alreadyExists = this.pokemons.some((p) => p.id === pokemon.id);
    if (alreadyExists) {
      throw new PokemonAlreadyExistsError(pokemon.id, pokemon.name);
    }

    this.pokemons.push(pokemon);
    await this.saveToFile();
  }

  async removeByIdOrName(id?: number, name?: string): Promise<void> {
    if (!id && !name) {
      throw new IdOrNameNotSendError();
    }

    const initialLength = this.pokemons.length;

    if (id) {
      this.pokemons = this.pokemons.filter((p) => p.id !== id);
      if (this.pokemons.length === initialLength) {
        throw new PokemonNotFoundError(id);
      }
    } else if (name) {
      this.pokemons = this.pokemons.filter((p) => p.name.toLowerCase() !== name.toLowerCase());
      if (this.pokemons.length === initialLength) {
        throw new PokemonNotFoundError(undefined, name);
      }
    }
    await this.saveToFile();
  }

  private async saveToFile(): Promise<void> {
    await writeFile(FILE_PATH, JSON.stringify(this.pokemons, null, 2), "utf-8");
  }
}
