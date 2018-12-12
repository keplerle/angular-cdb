import { TestBed } from '@angular/core/testing';

import { HeaderHttpService } from './header-http.service';

describe('HeaderHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeaderHttpService = TestBed.get(HeaderHttpService);
    expect(service).toBeTruthy();
  });
});
