import { TestBed } from '@angular/core/testing';

import { RealtimeChat } from './realtime-chat';

describe('RealtimeChat', () => {
  let service: RealtimeChat;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RealtimeChat);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
