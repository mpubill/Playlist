import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlaylistComponent } from './ver-playlist.component';

describe('VerPlaylistComponent', () => {
  let component: VerPlaylistComponent;
  let fixture: ComponentFixture<VerPlaylistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerPlaylistComponent]
    });
    fixture = TestBed.createComponent(VerPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
