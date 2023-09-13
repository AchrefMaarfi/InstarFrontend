import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-provider-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class ProviderSalesComponent {

  sales: any[] = [];

  constructor(private router: Router,private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getSalesByProvider().subscribe(
      (data: any[]) => {
        this.sales = data;
        console.log(this.sales);
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
}
