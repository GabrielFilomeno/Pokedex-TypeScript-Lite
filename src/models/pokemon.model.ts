export interface PokemonProps {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
}

export class Pokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;

  constructor(props: PokemonProps) {
    this.id = props.id;
    this.name = props.name;
    this.types = props.types;
    this.height = props.height;
    this.weight = props.weight;
  }

  getFormattedPokemon(): string {
    return ` ID: ${this.id} | Nome: ${this.name} | Tipos: ${this.types.join(", ")} | Altura: ${this.height}m | Peso: ${this.weight}kg `;
  }
}
