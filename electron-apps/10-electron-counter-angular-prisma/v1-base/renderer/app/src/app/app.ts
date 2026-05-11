import { Component, OnInit, signal } from '@angular/core';
import { CounterService } from './services/counter.service';
import { CounterDisplay } from './component/counter-display/counter-display';
import { CounterButtons } from './component/counter-buttons/counter-buttons';

@Component({
  selector: 'app-root',
  imports: [CounterDisplay, CounterButtons],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {

  // Signal : valeur réactive — quand elle change, Angular met à jour l'affichage
  count = signal(0);

  constructor(private counterService: CounterService) {}

  // ngOnInit : appelé par Angular après la création du composant
  // On charge la valeur persistée depuis le fichier JSON
  async ngOnInit(): Promise<void> {
    this.count.set(await this.counterService.getCounter());
  }

  async increment(): Promise<void> {
    this.count.set(await this.counterService.increment());
  }

  async decrement(): Promise<void> {
    this.count.set(await this.counterService.decrement());
  }

  async reset(): Promise<void> {
    this.count.set(await this.counterService.reset());
  }
}
