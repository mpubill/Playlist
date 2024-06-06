import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCancionesComponent } from './ver-canciones.component';

describe('VerCancionesComponent', () => {
  let component: VerCancionesComponent;
  let fixture: ComponentFixture<VerCancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerCancionesComponent]
    });
    fixture = TestBed.createComponent(VerCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
