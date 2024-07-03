import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { Favorite } from '../../../models/Favorite.model';
import { VideoTableItemComponent } from '../video-table-item/video-table-item.component';

@Component({
  selector: '[video-table]',
  templateUrl: './video-table.component.html',
  styleUrls: ['./video-table.component.scss'],
  standalone: true,
  imports: [NgFor, VideoTableItemComponent],
})
export class VideoTableComponent {
  @Input() favorites: Favorite[] = [];
}
