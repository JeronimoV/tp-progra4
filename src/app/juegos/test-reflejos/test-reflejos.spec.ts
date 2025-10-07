import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReflejos } from './test-reflejos';

describe('TestReflejos', () => {
  let component: TestReflejos;
  let fixture: ComponentFixture<TestReflejos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestReflejos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestReflejos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
