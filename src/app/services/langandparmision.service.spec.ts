import { TestBed } from '@angular/core/testing';

import { LangandparmisionService } from './langandparmision.service';

describe('LangandparmisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LangandparmisionService = TestBed.get(LangandparmisionService);
    expect(service).toBeTruthy();
  });
});
