import { Component, inject } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { moon, sunny } from 'ionicons/icons';

import { ThemeService } from '../../services/theme.service';

// Botón reutilizable de modo oscuro: se coloca en la barra de cada página.
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [IonButton, IonIcon],
  template: `
    <ion-button
      (click)="theme.toggle()"
      [attr.aria-label]="theme.dark() ? 'Activar modo claro' : 'Activar modo oscuro'"
      [title]="theme.dark() ? 'Modo claro' : 'Modo oscuro'">
      <ion-icon slot="icon-only" [name]="theme.dark() ? 'sunny' : 'moon'"></ion-icon>
    </ion-button>
  `
})
export class ThemeToggleComponent {

  theme = inject(ThemeService);

  constructor() {
    // En Standalone los iconos de Ionicons se registran explícitamente
    addIcons({ moon, sunny });
  }
}
