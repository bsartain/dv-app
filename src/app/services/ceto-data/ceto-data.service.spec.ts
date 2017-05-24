import { TestBed, inject } from '@angular/core/testing';

import { CetoDataService } from './ceto-data.service';

describe('CetoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CetoDataService]
    });
  });

  it('should ...', inject([CetoDataService], (service: CetoDataService) => {
    expect(service).toBeTruthy();
  }));
});
