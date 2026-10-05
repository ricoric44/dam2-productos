import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet
  ]
})
export class AppComponent {
  // Se crea al arrancar para aplicar el tema guardado antes de pintar las páginas
  private theme = inject(ThemeService);
}
