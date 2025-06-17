import { TestBed } from '@angular/core/testing';

import { PaymenService } from './paymen.service';

describe('PaymenService', () => {
  let service: PaymenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
