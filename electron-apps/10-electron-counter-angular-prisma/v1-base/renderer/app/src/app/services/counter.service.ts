import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';

// CounterService : logique métier du compteur
// Fait le pont entre le composant App et l'API Electron (window.api).

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  constructor(private electronService: ElectronService) {}

  getCounter(): Promise<number> {
    return this.electronService.getApi().getCounter();
  }

  increment(): Promise<number> {
    return this.electronService.getApi().increment();
  }

  decrement(): Promise<number> {
    return this.electronService.getApi().decrement();
  }

  reset(): Promise<number> {
    return this.electronService.getApi().reset();
  }
}
