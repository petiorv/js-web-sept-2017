import { TestBed, async, inject } from '@angular/core/testing';

import { Auth.Guard.ServiceGuard } from './auth.guard.service.guard';

describe('Auth.Guard.ServiceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth.Guard.ServiceGuard]
    });
  });

  it('should ...', inject([Auth.Guard.ServiceGuard], (guard: Auth.Guard.ServiceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
