import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { BoxService } from "./repositories/pokemon.repository.js";

import { TerminalController } from "./controllers/terminal-controller.js";

const terminalControl = readline.createInterface({ input, output });

function showWelcome(): void {
  console.clear();
  console.log("==========================================");
  console.log("       🔴 BEM-VINDO À POKÉDEX CLI 🔴      ");
  console.log("==========================================");
  console.log("Sua enciclopédia Pokémon no terminal!\n");
}

function showMenu(): void {
  console.log("------------------ MENU ------------------");
  console.log("1. Buscar Pokémon por Nome ou ID na PokeApi");
  console.log("2. Listar Pokémons Salvos");
  console.log("3. Remover Pokémon Salvo Por Nome ou ID");
  console.log("0. Sair");
  console.log("------------------------------------------");
}

async function main(): Promise<void> {
  const boxService = new BoxService();
  await boxService.init();

  const terminalController = new TerminalController(terminalControl, boxService);

  let running = true;
  showWelcome();

  while (running) {
    showMenu();
    const answer = await terminalControl.question("\n👉 Escolha uma opção: ");

    console.log();

    switch (answer.trim()) {
      case "1": {
        const { shouldExit } = await terminalController.handleSearchPokemon();
        if (shouldExit) {
          console.log("👋 Saindo da Pokédex... Até a próxima, Treinador!");
          running = false;
        }
        break;
      }

      case "2":
        terminalController.handleListSavedPokemons();
        break;

      case "3":
        //TODO: Implementar a remoção de Pokémons Salvos por Nome ou ID
        console.log("➕ [Em breve] Removendo Pokémon Salvo por Nome ou ID...");
        break;

      case "0":
        console.log("👋 Saindo da Pokédex... Até a próxima, Treinador!");
        running = false;
        break;

      default:
        console.log("❌ Opção inválida! Por favor, digite um número válido do menu.");
        break;
    }

    if (running && answer.trim() !== "1") {
      await terminalControl.question("\nPressione [ENTER] para continuar...");
      console.clear();
    } else if (running) {
      console.clear();
    }
  }

  terminalControl.close();
}

main().catch((error) => {
  console.error("Ocorreu um erro inesperado:", error);
  terminalControl.close();
});
