import { TestBed } from '@angular/core/testing';

import { AuthInterceptor as AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
