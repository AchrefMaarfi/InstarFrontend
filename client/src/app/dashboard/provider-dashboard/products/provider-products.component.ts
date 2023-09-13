import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-provider-products',
  templateUrl: './provider-products.component.html',
  styleUrls: ['./provider-products.component.css']
})
export class ProviderProductsComponent {
  products: any[] = [];
  selectedSort: string = 'newest';

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._product.getProductsByProvider("15").subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }
  
  sortProducts() {
    switch (this.selectedSort) {
      case 'newest':
        this.products.sort((a, b) => b.id - a.id);
        break;
      case 'oldest':
        this.products.sort((a, b) => a.id - b.id);
        break;
      case 'name':
        this.products.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

}
