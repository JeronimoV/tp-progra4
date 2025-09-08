import { TestBed } from '@angular/core/testing';

import { GithubCall } from './github-call';

describe('GithubCall', () => {
  let service: GithubCall;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubCall);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
