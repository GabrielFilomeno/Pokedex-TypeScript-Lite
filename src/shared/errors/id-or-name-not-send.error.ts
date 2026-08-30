export class IdOrNameNotSendError extends Error {
  constructor() {
    super(`É necessário fornecer um ID ou nome para realizar essa operação.`);
    this.name = "IdOrNameNotSendError";
  }
}
