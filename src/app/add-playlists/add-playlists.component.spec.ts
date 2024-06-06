import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlaylistsComponent } from './add-playlists.component';

describe('AddPlaylistsComponent', () => {
  let component: AddPlaylistsComponent;
  let fixture: ComponentFixture<AddPlaylistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlaylistsComponent]
    });
    fixture = TestBed.createComponent(AddPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
