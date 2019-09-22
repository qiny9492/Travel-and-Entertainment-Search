import { TestBed, inject } from '@angular/core/testing';

import { IpapiService } from './ipapi.service';

describe('IpapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpapiService]
    });
  });

  it('should be created', inject([IpapiService], (service: IpapiService) => {
    expect(service).toBeTruthy();
  }));
});
