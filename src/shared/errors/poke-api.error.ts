export class PokeApiError extends Error {
  constructor(status: number, statusText: string) {
    super(`Falha na requisição à PokeAPI: status ${status} (${statusText})`);
    this.name = "PokeApiError";
  }
}
