import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcateComponent } from './listcate.component';

describe('ListcateComponent', () => {
  let component: ListcateComponent;
  let fixture: ComponentFixture<ListcateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
