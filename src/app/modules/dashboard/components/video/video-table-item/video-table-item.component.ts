import { Component, Input } from '@angular/core';
import { Favorite } from '../../../models/Favorite.model';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe } from '@angular/common';
import { FavoritesService } from '../../../services/favorites/favorites.service';

@Component({
  selector: '[video-table-item]',
  templateUrl: './video-table-item.component.html',
  styleUrls: ['./video-table-item.component.scss'],
  standalone: true,
  imports: [AngularSvgIconModule, DatePipe],
})
export class VideoTableItemComponent {
  @Input() favorite = <Favorite>{};

  constructor(private _favoriteService: FavoritesService) {}

  removeFavorite() {
    const currentFav = this.favorite;
    currentFav.isFavorite = false;
    this._favoriteService.removeFavorite(this.favorite);
  }
}
