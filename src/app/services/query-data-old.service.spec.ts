/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QueryDataOldService } from '../services/query-data-old.service';

describe('QueryDataOldService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryDataOldService]
    });
  });

  it('should ...', inject([QueryDataOldService], (service: QueryDataOldService) => {
    expect(service).toBeTruthy();
  }));
});
