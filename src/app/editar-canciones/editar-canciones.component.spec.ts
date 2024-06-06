import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCancionesComponent } from './editar-canciones.component';

describe('EditarCancionesComponent', () => {
  let component: EditarCancionesComponent;
  let fixture: ComponentFixture<EditarCancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCancionesComponent]
    });
    fixture = TestBed.createComponent(EditarCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
