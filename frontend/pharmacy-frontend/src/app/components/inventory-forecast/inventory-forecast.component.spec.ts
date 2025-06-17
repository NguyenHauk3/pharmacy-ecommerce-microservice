import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryForecastComponent } from './inventory-forecast.component';

describe('InventoryForecastComponent', () => {
  let component: InventoryForecastComponent;
  let fixture: ComponentFixture<InventoryForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
