import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-counter-buttons',
  imports: [],
  templateUrl: './counter-buttons.html',
  styleUrl: './counter-buttons.css',
})
export class CounterButtons {

  // @Output : événements envoyés vers le composant parent (App)
  // EventEmitter<void> : l'événement ne transporte pas de données
  @Output() incremented = new EventEmitter<void>();
  @Output() decremented = new EventEmitter<void>();
  @Output() resetted    = new EventEmitter<void>();

  onIncrement(): void { this.incremented.emit(); }
  onDecrement(): void { this.decremented.emit(); }
  onReset():     void { this.resetted.emit();    }
}
