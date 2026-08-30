export class PokemonAlreadyExistsError extends Error {
  constructor(id: number, name: string) {
    super(`Pokémon (ID: ${id}) ${name} já está salvo na Pokédex.`);
    this.name = "PokemonAlreadyExistsError";
  }
}
