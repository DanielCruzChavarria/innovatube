import { Component, HostListener, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube/youtube.service';
import { Video } from '../../interfaces/video.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { VideoSingleCardComponent } from '../../components/video/video-single-card/video-single-card.component';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [NgFor, HeaderComponent, VideoSingleCardComponent, FormsModule],
})
export class SearchComponent implements OnInit {
  videos: Video[] = [];
  viewMode: 'list' | 'grid' = 'grid'; // Cambia entre 'list' y 'grid'
  private searchTerms = new Subject<string>();
  query: string = '';
  debounceTime = 700; // Tiempo de espera en milisegundos para realizar la búsqueda

  constructor(
    private _ytService: YoutubeService,
    private _favoriteService: FavoritesService
  ) {
    this.setupSearchSubscription();
  }

  ngOnInit(): void {
    this.loadPopularVideos();
  }

  loadPopularVideos(): void {
    this._ytService.getPopularVideos().subscribe(
      async (response) => {
        this.videos = await this.lookIsFavorite(response.items);
      },
      (error) => {
        console.error('Error fetching popular videos:', error);
      }
    );
  }

  private setupSearchSubscription(): void {
    this.searchTerms
      .pipe(
        debounceTime(this.debounceTime), // Esperar 300ms después de cada pulsación de tecla
        distinctUntilChanged(), // Ignorar si el nuevo término de búsqueda es igual al anterior
        switchMap((query: string) =>
          this._ytService.searchAndFetchVideoDetails(query)
        )
      )
      .subscribe(
        (videos) => {
          this.videos = videos;
        },
        (error) => {
          console.error('Error fetching videos:', error);
        }
      );
  }

  searchVideos(query: string): void {
    this.searchTerms.next(query);
  }

  lookIsFavorite(videos: Video[]): Promise<Video[]> {
    return new Promise((resolve) => {
      const promises: Promise<Video>[] = videos.map((video) =>
        this._favoriteService
          .isFavorite(video.id.toString())
          .then((isFavorite) => ({
            ...video,
            isFavorite,
          }))
      );
      Promise.all(promises).then((videosWithFavorites) =>
        resolve(videosWithFavorites)
      );
    });
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }
}
