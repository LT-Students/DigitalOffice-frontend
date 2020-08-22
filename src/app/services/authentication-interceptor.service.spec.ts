import { TestBed } from '@angular/core/testing';

import { AuthenticationInterceptorService } from './authentication-interceptor.service';

describe('AuthenticationInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationInterceptorService = TestBed.get(AuthenticationInterceptorService);
    expect(service).toBeTruthy();
  });
});
