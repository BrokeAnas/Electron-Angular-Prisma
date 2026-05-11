import { Injectable } from '@angular/core';
import { CounterAPI } from '
../../../types/electron';
@Injectable({ providedIn: 'root' })
export class ElectronService {
isElectron(): boolean {
return !!(window && window.api); // false si ouvert dans un navigateur
}
getApi(): CounterAPI {
if (!this.isElectron()) {
throw new Error('API Electron non disponible');
}
return window.api;
}