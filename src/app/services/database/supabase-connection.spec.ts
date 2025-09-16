import { TestBed } from '@angular/core/testing';

import { SupabaseConnection } from './supabase-connection';

describe('SupabaseConnection', () => {
  let service: SupabaseConnection;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupabaseConnection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
