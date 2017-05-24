/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SandboxService } from './sandbox.service';

describe('SandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SandboxService]
    });
  });

  it('should ...', inject([SandboxService], (service: SandboxService) => {
    expect(service).toBeTruthy();
  }));
});
