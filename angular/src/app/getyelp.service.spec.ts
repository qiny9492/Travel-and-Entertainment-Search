import { TestBed, inject } from '@angular/core/testing';

import { GetyelpService } from './getyelp.service';

describe('GetyelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetyelpService]
    });
  });

  it('should be created', inject([GetyelpService], (service: GetyelpService) => {
    expect(service).toBeTruthy();
  }));
});
