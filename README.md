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

## 🧠 Conceitos aplicados

- **Arquitetura em Camadas:** Separação clara entre `Controllers`, `Services`, `Repositories`, `Models`, `Utils` e `Shared`.
- **Tipagem Estática e Interfaces:** Modelagem dos dados da API e das entidades internas.
- **Erros Customizados:** Classes de erros personalizadas para fluxos de exceção claros.
- **Persistência de Dados:** Leitura e gravação assíncrona de arquivos JSON com `node:fs/promises`.
- **Consumo de API REST:** Requisições HTTP com `fetch` nativo.

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
