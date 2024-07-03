import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, map, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  apiUrl: string = '/api/youtube-api';

  constructor(private http: HttpClient) {}

  searchVideos(query: string, maxResults: number = 10): Observable<any[]> {
    const params = new HttpParams()
      .set('part', 'id')
      .set('q', query)
      .set('type', 'video')
      .set('maxResults', maxResults.toString());

      return this.http.get<any>(`${this.apiUrl}/search`, { params }).pipe(
        map((response) => response.items || []), // Manejo de respuesta para asegurar que siempre hay un arreglo de items
        catchError((error) => {
          console.error('Error occurred while searching for videos:', error);
          return throwError(() => new Error('Failed to search videos'));
        })
      );
  }

  getVideoDetails(videoIds: string): Observable<any[]> {
    const params = new HttpParams()
      .set('part', 'id,snippet,contentDetails,statistics,player')
      .set('id', videoIds); // videoIds es una cadena de IDs separados por comas

    return this.http.get<any>(`${this.apiUrl}/videos`, { params }).pipe(
      map((response) => response.items || []) // Manejo de respuesta para asegurar que siempre hay un arreglo de items
    );
  }

  searchAndFetchVideoDetails(query: string, maxResults: number = 10): Observable<any[]> {
    return this.searchVideos(query, maxResults).pipe(
      switchMap((searchResponse) => {
        const videoIds = searchResponse.map((item: any) => item.id.videoId).join(',');
        return this.getVideoDetails(videoIds);
      })
    );
  }

  getPopularVideos(
    regionCode: string = 'MX',
    maxResults: number = 32
  ): Observable<any> {
    const params = new HttpParams()
      .set('part', 'id,snippet,contentDetails,statistics, player')
      .set('chart', 'mostPopular')
      .set('regionCode', regionCode)
      .set('maxResults', maxResults.toString());

    return this.http.get(`${this.apiUrl}/videos`, { params });
  }

  getPage(pageToken: string): Observable<any> {
    const params = new HttpParams()
      .set('part', 'id,snippet,contentDetails,statistics, player')
      .set('pageToken', pageToken)
      .set('maxResults', '10');

    return this.http.get(`${this.apiUrl}/search`, { params });
  }
}
