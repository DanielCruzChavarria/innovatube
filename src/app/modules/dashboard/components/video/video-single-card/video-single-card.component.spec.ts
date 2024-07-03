import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSingleCardComponent } from './video-single-card.component';

describe('VideoSingleCardComponent', () => {
  let component: VideoSingleCardComponent;
  let fixture: ComponentFixture<VideoSingleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [VideoSingleCardComponent]
    });
    fixture = TestBed.createComponent(VideoSingleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
