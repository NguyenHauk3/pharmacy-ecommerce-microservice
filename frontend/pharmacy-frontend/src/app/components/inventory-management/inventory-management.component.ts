import { Component, OnInit } from '@angular/core';
import { InventoryDTO, InventoryForecastDTO, InventoryLog, InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss']
})
export class InventoryManagementComponent implements OnInit {
  productId: number = 0;
  quantity: number = 0;
  currentInventory?: InventoryDTO;
  lowStock: InventoryDTO[] = [];
  forecastList: InventoryForecastDTO[] = [];
  logs: InventoryLog[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadLowStock();
    this.loadForecast();
    this.loadLogs();
  }

  getInventory() {
    this.inventoryService.getInventory(this.productId).subscribe(data => {
      this.currentInventory = data;
      console.log(data)
    });
  }

  import() {
    this.inventoryService.importInventory(this.productId, this.quantity).subscribe(() => {
      alert('Nhập hàng thành công');
      this.getInventory();
      this.loadLogs();
    });
  }

  export() {
    this.inventoryService.exportInventory(this.productId, this.quantity).subscribe(() => {
      alert('Xuất hàng thành công');
      this.getInventory();
      this.loadLogs();
    });
  }

  loadLowStock() {
    this.inventoryService.getLowStock().subscribe(data => this.lowStock = data);
    console.log('Dự báo tồn kho:', this.lowStock); 
  }

  loadForecast() {
    this.inventoryService.getForecast().subscribe(data => this.forecastList = data);
    console.log('Dự bá:', this.forecastList); 
  }

  loadLogs() {
    this.inventoryService.getLogs().subscribe(data => this.logs = data);
  }

}
