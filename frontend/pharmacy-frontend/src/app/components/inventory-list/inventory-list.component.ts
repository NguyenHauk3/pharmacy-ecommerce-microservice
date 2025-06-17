import { Component, OnInit } from '@angular/core';
import { InventoryDTO, InventoryService } from 'src/app/services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit{
 inventories: InventoryDTO[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadLowStock();
  }

  loadLowStock(): void {
    this.inventoryService.getLowStock().subscribe(data => {
      this.inventories = data;
    });
  }
}
