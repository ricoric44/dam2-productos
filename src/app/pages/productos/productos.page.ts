import { Component, OnInit, computed, inject, signal } from '@angular/core';
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

  // Paginación
  readonly pageSize = 10;

  page = signal(1);

  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.pageSize)));

  // Posición del primer y último producto mostrados ("Mostrando 11-20 de 194")
  firstItem = computed(() => (this.page() - 1) * this.pageSize + 1);

  lastItem = computed(() => this.firstItem() + this.products().length - 1);

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.page()) {
      return;
    }
    this.page.set(page);
    this.loadProducts();
  }

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

    const skip = (this.page() - 1) * this.pageSize;

    this.productService.getProducts(this.pageSize, skip)
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
