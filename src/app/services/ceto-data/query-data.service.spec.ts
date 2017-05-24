import { TestBed, inject } from '@angular/core/testing';

import { QueryDataService } from './query-data.service';

describe('QueryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryDataService]
    });
  });

  it('should ...', inject([QueryDataService], (service: QueryDataService) => {
    expect(service).toBeTruthy();
  }));
});
