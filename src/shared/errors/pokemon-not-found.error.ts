export class PokemonNotFoundError extends Error {
  constructor(id?: number, name?: string) {
    if (id) {
      super(`Pokémon com ID: ${id} não foi encontrado na Pokédex.`);
    } else if (name) {
      super(`Pokémon ${name} não foi encontrado na Pokédex.`);
    } else {
      super(`Nenhum Pokémon foi encontrado na Pokédex.`);
    }
    this.name = "PokemonNotFoundError";
  }
}
