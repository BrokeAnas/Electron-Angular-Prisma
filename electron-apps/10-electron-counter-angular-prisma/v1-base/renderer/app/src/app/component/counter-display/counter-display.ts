import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-counter-display',
  imports: [],
  templateUrl: './counter-display.html',
  styleUrl: './counter-display.css',
})
export class CounterDisplay {

  // @Input : valeur reçue du composant parent (App)
  // Le ! dit à TypeScript "cette valeur sera toujours fournie par le parent"
  @Input() value!: number;
}
