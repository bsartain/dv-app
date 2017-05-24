import { TestBed, inject } from '@angular/core/testing';

import { QueryPageService } from './query-page.service';

describe('QueryPageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryPageService]
    });
  });

  it('should ...', inject([QueryPageService], (service: QueryPageService) => {
    expect(service).toBeTruthy();
  }));
});
