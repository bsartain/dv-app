import { TestBed, inject } from '@angular/core/testing';

import { MedusaDataService } from './medusa-data.service';

describe('MedusaDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedusaDataService]
    });
  });

  it('should ...', inject([MedusaDataService], (service: MedusaDataService) => {
    expect(service).toBeTruthy();
  }));
});
