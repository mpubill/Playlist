import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionesCancionesComponent } from './acciones-canciones.component';

describe('AccionesCancionesComponent', () => {
  let component: AccionesCancionesComponent;
  let fixture: ComponentFixture<AccionesCancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionesCancionesComponent]
    });
    fixture = TestBed.createComponent(AccionesCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
