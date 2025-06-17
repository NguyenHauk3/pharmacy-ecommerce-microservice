import { Component } from '@angular/core';
import { InventoryForecastDTO, InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-forecast',
  templateUrl: './inventory-forecast.component.html',
  styleUrls: ['./inventory-forecast.component.scss']
})
export class InventoryForecastComponent {
  
forecasts: InventoryForecastDTO[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadForecast();
  }

  loadForecast(): void {
    this.inventoryService.getForecast().subscribe(data => {
      this.forecasts = data;
    });
  }
}
