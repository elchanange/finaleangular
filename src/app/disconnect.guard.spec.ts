import { TestBed, async, inject } from '@angular/core/testing';

import { DisconnectGuard } from './disconnect.guard';

describe('DisconnectGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisconnectGuard]
    });
  });

  it('should ...', inject([DisconnectGuard], (guard: DisconnectGuard) => {
    expect(guard).toBeTruthy();
  }));
});
