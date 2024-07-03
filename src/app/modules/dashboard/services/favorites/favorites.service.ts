import { Injectable } from '@angular/core';
import { Favorite } from '../../models/Favorite.model';
import { remult } from 'remult';
import { Video } from '../../interfaces/video.interface';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public favoritesRepo = remult.repo(Favorite);
  remult = remult;
  constructor() {}

  async addFavorite(video: Video): Promise<void> {
    try {
      const favVideo = this.makeVideoToFavorite(video);
      await this.favoritesRepo.insert(favVideo);
    } catch (error) {
      console.error('Error adding favorite:', error);
      alert('Failed to add favorite. Please try again.');
    }
  }

  async saveFavorite(video: Video): Promise<void> {
    try {
      const exitingFav = await this.getFavoriteByVideoID(video.id.toString());
      const favVideo = this.makeVideoToFavorite(video, exitingFav);
      await this.favoritesRepo.save(favVideo);
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Failed to save favorite. Please try again.');
    }
  }

  async removeFavorite(fav: Favorite): Promise<void> {
    try {
      await this.favoritesRepo.delete(fav);
    } catch (error) {
      console.error('Error updating favorite:', error);
      alert('Failed to update favorite. Please try again.');
    }
  }

  async isFavorite(id: string): Promise<boolean> {
    if (!remult.authenticated()) return false;
    const userID = remult.user?.id || '';
    console.log('Is Favorite', id);
    console.log('User ID', userID);
    const fav = await this.favoritesRepo.findFirst({
      videoID: id,
      userID: userID,
    });
    return !!fav;
  }

  async getFavoriteByVideoID(id: string) {
    return await this.favoritesRepo.findFirst({ videoID: id });
  }

  makeVideoToFavorite(video: Video, existingFav?: Favorite): Favorite {
    const favorite: Favorite = new Favorite();
    favorite.videoID = video.id.toString();
    favorite.title = video.snippet.title;
    favorite.userID = this.remult.user?.id || '';
    favorite.url = this.extractURLFromIframe(video.player.embedHtml) || '';
    favorite.thumbnailUrl = video.snippet.thumbnails.high.url || '';
    if (existingFav) {
      favorite.id = existingFav.id;
    }

    return favorite;
  }

  extractURLFromIframe(iframeString: string): string {
    const regex = /src="([^"]+)"/;
    const match = iframeString.match(regex);
    if (match && match[1]) {
      let url = match[1];
      if (url.startsWith('//')) {
        url = 'https:' + url;
      }
      return url;
    } else {
      throw new Error('Invalid iframe string');
    }
  }
}
