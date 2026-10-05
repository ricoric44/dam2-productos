import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';

import { Product, ProductsResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {

  private productService = inject(ProductService);

  // Angular 22 no usa Zone.js: con signals la vista se actualiza sola
  // cuando llegan los datos de la API.
  products = signal<Product[]>([]);

  total = signal(0);

  loading = signal(false);

  error = signal('');

  // Stock valorado = unidades * precio - descuento aplicable
  stockValue(product: Product): number {
    const total = product.stock * product.price;
    const discount = total * product.discountPercentage / 100;
    return total - discount;
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.loading.set(true);

    this.error.set('');

    this.productService.getProducts()
      .subscribe({

        next: (response: ProductsResponse) => {
          this.products.set(response.products);
          this.total.set(response.total);
          this.loading.set(false);
        },

        error: (error) => {
          console.error(error);
          this.error.set('No se han podido cargar los productos.');
          this.loading.set(false);
        }

      });
  }
}
