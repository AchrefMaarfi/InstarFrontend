import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: any[] = [];
  selectedSort: string = 'newest';
  editingProductId: string | null = null;
  editedProductData: any = {};

  constructor(private _product: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._product.getProducts().subscribe(
      (data: any) => {
        this.products = data;
      },
      (error: any) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(id: string) {
    console.log('Deleting product with ID:', id);
    this._product.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
      },
      (error: any) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  editOrSaveProduct(id: string) {
    if (this.editingProductId === id) {
      // Save the edited product
      this._product.updateProduct(id, this.editedProductData).subscribe(
        (updatedProduct: any) => {
          const index = this.products.findIndex(product => product.id === id);
          if (index !== -1) {
            this.products[index] = updatedProduct;
          }
          this.editingProductId = null;
          this.editedProductData = {};
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
    } else {
      // Edit the product
      this.editingProductId = id;
      const product = this.products.find(p => p.id === id);
      this.editedProductData = { ...product };
    }
  }

  cancelEdit() {
    this.editingProductId = null;
    this.editedProductData = {};
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
