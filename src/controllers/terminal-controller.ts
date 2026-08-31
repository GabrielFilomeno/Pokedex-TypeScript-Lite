import type * as readline from "node:readline/promises";
import { PokeApiService } from "../services/poke-api.services.js";
import type { BoxService } from "../repositories/pokemon.repository.js";
import { Pokemon } from "../models/pokemon.model.js";
import { PokemonNotFoundError } from "../shared/errors/pokemon-not-found.error.js";
import { PokemonAlreadyExistsError } from "../shared/errors/pokemon-already-exists.error.js";
import { IdOrNameNotSendError } from "../shared/errors/id-or-name-not-send.error.js";
import { PokeApiError } from "../shared/errors/poke-api.error.js";

export class TerminalController {
  private pokeApiService: PokeApiService;
  private boxService: BoxService;
  private terminalControl: readline.Interface;

  constructor(terminalControl: readline.Interface, boxService: BoxService) {
    this.terminalControl = terminalControl;
    this.boxService = boxService;
    this.pokeApiService = new PokeApiService();
  }

  async handleSearchPokemon(): Promise<{ shouldExit: boolean }> {
    let searching = true;

    while (searching) {
      console.clear();
      console.log("==========================================");
      console.log("       🔍 BUSCAR POKÉMON NA POKEAPI       ");
      console.log("==========================================");
      console.log("Digite o Nome ou ID (ou digite '0' para voltar ao menu principal)\n");

      const input = await this.terminalControl.question("👉 Digite o Nome ou ID: ");
      const query = input.trim();

      if (query === "0") {
        return { shouldExit: false };
      }

      if (!query) {
        console.log("\n⚠️ Por favor, digite um nome ou ID válido.");
        await this.pressEnterToContinue();
        continue;
      }

      console.log(`\n⏳ Buscando "${query}" na PokeAPI...`);

      let foundPokemon: Pokemon | null = null;

      try {
        foundPokemon = await this.pokeApiService.getPokemonByNameOrId(query);
      } catch (error) {
        console.log();
        if (error instanceof PokemonNotFoundError) {
          console.log(`❌ ${error.message}`);
        } else if (error instanceof IdOrNameNotSendError) {
          console.log(`⚠️ ${error.message}`);
        } else if (error instanceof PokeApiError) {
          console.log(`❌ Erro na PokeAPI: ${error.message}`);
        } else {
          console.log("❌ Ocorreu um erro inesperado durante a busca.");
        }

        console.log();
        const retry = await this.terminalControl.question("Deseja tentar buscar outro Pokémon? (1 = Sim / 0 = Não): ");
        if (retry.trim() === "1") {
          continue;
        } else if (retry.trim() === "0") {
          return { shouldExit: false };
        }else {
          console.log("❌ Opção inválida! Escolha 1 ou 0.");
          await this.pressEnterToContinue();
          continue;
        }
      }

      if (foundPokemon) {
        const result = await this.handleFoundPokemonMenu(foundPokemon);
        if (result.action === "search_again") {
          continue;
        } else if (result.action === "go_home") {
          return { shouldExit: false };
        } else if (result.action === "exit") {
          return { shouldExit: true };
        }
      }
    }

    return { shouldExit: false };
  }

  private async handleFoundPokemonMenu(
    pokemon: Pokemon
  ): Promise<{ action: "search_again" | "go_home" | "exit" }> {
    let inSubMenu = true;
    let isSaved = false;

    while (inSubMenu) {
      console.clear();
      console.log("==========================================");
      console.log("          ✨ POKÉMON ENCONTRADO ✨        ");
      console.log("==========================================");
      console.log(`🆔 ID: #${pokemon.id}`);
      console.log(`📛 Nome: ${pokemon.name.toUpperCase()}`);
      console.log(`🏷️  Tipos: ${pokemon.types.join(", ")}`);
      console.log(`📏 Altura: ${pokemon.height} m`);
      console.log(`⚖️  Peso: ${pokemon.weight} kg`);
      console.log("==========================================\n");

      console.log("---------------- OPÇÕES ------------------");
      console.log("1. Salvar Pokémon");
      console.log("2. Buscar outro Pokémon");
      console.log("3. Voltar para a tela inicial");
      console.log("0. Finalizar execução");
      console.log("------------------------------------------");

      const option = await this.terminalControl.question("\n👉 Escolha uma opção: ");
      console.log();

      switch (option.trim()) {
        case "1": {
          if (isSaved) {
            console.log(`⚠️ O Pokémon ${pokemon.name} já foi salvo nesta sessão.`);
          } else {
            try {
              await this.boxService.add(pokemon);
              isSaved = true;
              console.log(`✅ Pokémon "${pokemon.name.toUpperCase()}" salvo com sucesso na memória e no arquivo local!`);
            } catch (error) {
              if (error instanceof PokemonAlreadyExistsError) {
                console.log(`⚠️ ${error.message}`);
              } else if (error instanceof Error) {
                console.log(`❌ Erro ao salvar Pokémon: ${error.message}`);
              } else {
                console.log("❌ Erro inesperado ao salvar Pokémon.");
              }
            }
          }
          await this.pressEnterToContinue();
          break;
        }

        case "2":
          return { action: "search_again" };

        case "3":
          return { action: "go_home" };

        case "0":
          return { action: "exit" };

        default:
          console.log("❌ Opção inválida! Escolha 1, 2, 3 ou 0.");
          await this.pressEnterToContinue();
          break;
      }
    }

    return { action: "go_home" };
  }

  private async pressEnterToContinue(): Promise<void> {
    await this.terminalControl.question("\nPressione [ENTER] para continuar...");
  }
}
