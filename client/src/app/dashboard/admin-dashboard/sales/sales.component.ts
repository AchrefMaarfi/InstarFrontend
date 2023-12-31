import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  sales: any[] = [];

  constructor(private router: Router,private saleService: SaleService) { }

  ngOnInit(): void {
    this.getSales();
  }

  getSales() {
    this.saleService.getAllSales().subscribe(
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
