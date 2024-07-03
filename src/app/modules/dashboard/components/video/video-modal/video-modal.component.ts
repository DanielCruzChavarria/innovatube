import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.scss'],
  standalone: true,
})
export class VideoModalComponent {
  @Input() sanitizedEmbedHtml: SafeHtml | undefined;

  closeModal() {
    document.body.removeChild(document.getElementById('videoModal') as Node);
  }
}
