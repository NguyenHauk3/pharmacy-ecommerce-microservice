import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpromoComponent } from './listpromo.component';

describe('ListpromoComponent', () => {
  let component: ListpromoComponent;
  let fixture: ComponentFixture<ListpromoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpromoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
