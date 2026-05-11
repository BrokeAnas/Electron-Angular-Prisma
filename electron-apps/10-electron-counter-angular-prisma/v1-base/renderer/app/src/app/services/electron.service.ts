import { Injectable } from '@angular/core';
import { CounterAPI } from '../../types/electron';

// ElectronService : point d'accès unique à window.api
// Vérifie que l'app tourne bien dans Electron avant tout appel.

@Injectable({
  providedIn: 'root',
})
export class ElectronService {

  // Retourne true si window.api est disponible (= contexte Electron)
  isElectron(): boolean {
    return !!(window && window.api);
  }

  // Retourne window.api avec le bon type TypeScript.
  // Lève une erreur si on est hors contexte Electron.
  getApi(): CounterAPI {
    if (!this.isElectron()) {
      throw new Error('API Electron non disponible (hors contexte Electron)');
    }
    return window.api;
  }
}
