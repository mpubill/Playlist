import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArtistaComponent } from './ver-artista.component';

describe('VerArtistaComponent', () => {
  let component: VerArtistaComponent;
  let fixture: ComponentFixture<VerArtistaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerArtistaComponent]
    });
    fixture = TestBed.createComponent(VerArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
