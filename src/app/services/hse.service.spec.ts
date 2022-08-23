import { TestBed } from '@angular/core/testing';

import { HseService } from './hse.service';

describe('HseService', () => {
  let service: HseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
