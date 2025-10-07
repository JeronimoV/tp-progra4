import { TestBed } from '@angular/core/testing';

import { GameInfo } from './game-info';

describe('GameInfo', () => {
  let service: GameInfo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInfo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
