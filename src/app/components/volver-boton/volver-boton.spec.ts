import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolverBoton } from './volver-boton';

describe('VolverBoton', () => {
  let component: VolverBoton;
  let fixture: ComponentFixture<VolverBoton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolverBoton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolverBoton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
