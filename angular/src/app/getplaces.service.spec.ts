import { TestBed, inject } from '@angular/core/testing';

import { GetplacesService } from './getplaces.service';

describe('GetplacesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetplacesService]
    });
  });

  it('should be created', inject([GetplacesService], (service: GetplacesService) => {
    expect(service).toBeTruthy();
  }));
});
