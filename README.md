# Pokédex TypeScript Lite

Uma aplicação de linha de comando (CLI) simples e interativa para consultar informações sobre Pokémons e gerenciar sua própria Pokédex local.

---

## 📖 Sobre o projeto

A **Pokédex TypeScript Lite** permite buscar dados em tempo real da [PokeAPI](https://pokeapi.co/) e salvar seus Pokémons favoritos localmente em formato JSON, simulando uma Pokédex dos jogos da franquia diretamente pelo terminal.

## 🎯 Objetivo

Praticar e consolidar conceitos de desenvolvimento com **TypeScript** e **Node.js**, aplicando boas práticas de arquitetura em camadas, tipagem estática, consumo de APIs assíncronas e manipulação de arquivos.

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/) (ES Modules)
- [TypeScript](https://www.typescriptlang.org/)
- [TSX](https://github.com/privatenumber/tsx) (Execução rápida em desenvolvimento)
- [PokeAPI](https://pokeapi.co/) (API REST pública)
- [Git](https://git-scm.com/) (Controle de versão)
- [GitHub](https://github.com/) (Repositório)

## 📋 Pré-requisitos para rodar

- **Node.js** (versão 18 ou superior recomendada)
- **npm** (incluso com o Node.js)
- **Git** (para clonar o repositório)
- **Conexão com a internet** (para consultar a PokeAPI)

## 🚀 Como instalar e rodar

```bash
# 1. Clone o repositório
git clone https://github.com/GabrielFilomeno/Pokedex-TypeScript-Lite.git

# 2. Entre na pasta do projeto
cd Pokedex-TypeScript-Lite

# 3. Instale as dependências
npm install

# 4. Execute em modo de desenvolvimento
npm run dev
```

## ✨ Funcionalidades

- **🔍 Buscar Pokémon:** Consulta por Nome ou ID na PokeAPI.
- **💾 Salvar Pokémon:** Adiciona o Pokémon buscado na sua Pokédex local (`pc_box.json`) e em memória.
- **📋 Listar Pokémons:** Exibe todos os Pokémons salvos com seus dados (ID, Nome, Tipos, Altura e Peso) ordenados por ordem de ID.
- **🗑️ Remover Pokémon:** Remove Pokémons da sua Pokédex local e em memória por Nome ou ID.
- **🛡️ Tratamento de Erros:** Validações de entradas, tratativas de Pokémon duplicado, não encontrado ou falhas de conexão.

## 💻 Exemplos de uso

```text
==========================================
       🔴 BEM-VINDO À POKÉDEX CLI 🔴
==========================================
Sua enciclopédia Pokémon no terminal!
```

```text
------------------ MENU ------------------
1. Buscar Pokémon por Nome ou ID na PokeApi
2. Listar Pokémons Salvos
3. Remover Pokémon Salvo Por Nome ou ID
0. Sair
------------------------------------------
```

### 1. Buscar e Salvar Pokémon

**Entrada testada:**

```text
👉 Digite o Nome ou ID: pikachu
```

**Saída esperada:**

```text
==========================================
          ✨ POKÉMON ENCONTRADO ✨
==========================================
🆔 ID: #25
📛 Nome: PIKACHU
🏷️  Tipos: electric
📏 Altura: 0.4 m
⚖️  Peso: 6 kg
==========================================

---------------- OPÇÕES ------------------
1. Salvar Pokémon
2. Buscar outro Pokémon
3. Voltar para a tela inicial
0. Finalizar execução
------------------------------------------

👉 Escolha uma opção: 1

✅ Pokémon "PIKACHU" salvo com sucesso na memória e no arquivo local!
```

---

### 2. Listar Pokémons Salvos

**Entrada testada:**

```text
👉 Escolha uma opção: 2
```

**Saída esperada:**

```text
==========================================
       📋 POKÉMONS SALVOS NA POKÉDEX
==========================================
Total de Pokémons salvos: 2

                                                                             |
 ID: 1 | Nome: bulbasaur | Tipos: grass, poison | Altura: 0.7m | Peso: 6.9kg |
_____________________________________________________________________________|
                                                                     |
 ID: 25 | Nome: pikachu | Tipos: electric | Altura: 0.4m | Peso: 6kg |
_____________________________________________________________________|
```

---

### 3. Remover Pokémon Salvo

**Entrada testada:**

```text
👉 Digite o Nome ou ID: 25
```

**Saída esperada:**

```text
✅ Pokémon "25" foi removido com sucesso da Pokédex!
```

---

### 4. Exemplos de Tratamento de Erro

- **Pokémon não encontrado na PokeAPI:**
  ```text
  ❌ Pokémon NomeInvalido não foi encontrado na Pokédex.
  ```
- **Pokémon já salvo na Pokédex:**
  ```text
  ⚠️ Pokémon (ID: 25) pikachu já está salvo na Pokédex.
  ```

## 🧠 Estrutura do projeto

- **🔴 main** (`src/main.ts`): Ponto de entrada da aplicação, responsável por inicializar o terminal e o controller.
- **🎮 Controllers (`src/controllers`):** Gerencia a interface de linha de comando (`TerminalController`), controlando a navegação nos menus via `node:readline`, capturando as entradas do usuário e exibindo as saídas formatadas.
- **⚙️ Services (`src/services`):** Centraliza a lógica de integração externa (`PokeApiService`), realizando requisições HTTP assíncronas com o `fetch` nativo para consumir a PokeAPI.
- **📦 Repositories (`src/repositories`):** Responsável pelo acesso e persistência de dados (`BoxService`), gerenciando tanto o estado em memória quanto a gravação/leitura no arquivo local `pc_box.json` com `node:fs/promises`.
- **🧱 Models (`src/models`):** Define a entidade central do domínio (`Pokemon`), encapsulando seus atributos (ID, Nome, Tipos, Altura, Peso) e métodos de apresentação.
- **🛠️ Utils (`src/utils`):** Funções utilitárias e de transformação (`PokemonMapper`), convertendo os dados brutos da PokeAPI (como altura em decímetros e peso em hectogramas) para o formato do modelo interno.
- **🧩 Shared (`src/shared`):** Recursos compartilhados por todas as camadas, contendo interfaces de tipagem (`interfaces/`) e classes de erros personalizadas (`errors/`).

## 📅 Quadro Kanban

Acompanhe como foi o planejamento do projeto no Kanban:

- [Quadro Kanban](https://github.com/users/GabrielFilomeno/projects/1)

## 🧭 Branches do projeto

- **main**: branch principal com a versão estável do projeto
- **develop**: branch de desenvolvimento que irá conter as novas funcionalidades
- **feat/configuracoes-iniciais**: branch com as configurações iniciais do projeto
- **feat/interfaces-e-repository**: branch com as interfaces e repositórios do projeto
- **feat/fluxo-buscar-pokemon-na-poke-api**: branch com o fluxo de busca e salvamento de pokémon na pokeapi
- **feat/fluxo-listar-pokemons-salvos**: branch com o fluxo de listagem de pokémons salvos
- **feat/fluxo-para-remover-pokemon**: branch com o fluxo para remover pokémon

## 🔮 Melhorias futuras

- [ ] Exibir mais dados do Pokémon como (HP, Ataque, Defesa, etc...)
- [ ] Adicionar busca com filtro exemplo filtrar por tipo, geração, etc...
- [ ] Adicionar opção para evoluir o Pokémon
