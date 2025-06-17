import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenresulsComponent } from './paymenresuls.component';

describe('PaymenresulsComponent', () => {
  let component: PaymenresulsComponent;
  let fixture: ComponentFixture<PaymenresulsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymenresulsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymenresulsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
