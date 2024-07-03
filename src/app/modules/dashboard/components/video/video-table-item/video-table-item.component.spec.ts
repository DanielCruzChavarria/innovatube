import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTableItemComponent } from './video-table-item.component';

describe('VideoTableItemComponent', () => {
  let component: VideoTableItemComponent;
  let fixture: ComponentFixture<VideoTableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoTableItemComponent]
    });
    fixture = TestBed.createComponent(VideoTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
