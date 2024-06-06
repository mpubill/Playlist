import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarArtistaComponent } from './editar-artista.component';

describe('EditarArtistaComponent', () => {
  let component: EditarArtistaComponent;
  let fixture: ComponentFixture<EditarArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarArtistaComponent]
    });
    fixture = TestBed.createComponent(EditarArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
