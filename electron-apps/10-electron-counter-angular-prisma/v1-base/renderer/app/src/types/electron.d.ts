// Déclaration TypeScript pour window.api
// Ce fichier permet à TypeScript de connaître le type de window.api
// qui est injecté par le preload script d'Electron.

export interface CounterAPI {
  getCounter: () => Promise<number>;
  increment:  () => Promise<number>;
  decrement:  () => Promise<number>;
  reset:      () => Promise<number>;
}

declare global {
  interface Window {
    api: CounterAPI;
  }
}
