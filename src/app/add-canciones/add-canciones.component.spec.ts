import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCancionesComponent } from './add-canciones.component';

describe('AddCancionesComponent', () => {
  let component: AddCancionesComponent;
  let fixture: ComponentFixture<AddCancionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCancionesComponent]
    });
    fixture = TestBed.createComponent(AddCancionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
