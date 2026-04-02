import { Component, input, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-buttons',
  imports: [MatIconModule],
  templateUrl: './buttons.html',
  styleUrl: './buttons.sass',
})
export class Buttons {
  readonly name = input<string>();
  readonly icon = input<string>();
  readonly disabled = input<boolean>();
  readonly clickButton = output<boolean>();

  onClick(): void {
    this.clickButton.emit(true);
  }
}
