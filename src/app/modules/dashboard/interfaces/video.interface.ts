export interface Video {
  kind: string;
  etag: any;
  id:
    | {
        kind: string;
        videoId: string;
      }
    | string;
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key in 'default' | 'medium' | 'high' | 'standard' | 'maxres']: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
  };
  player: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
  isFavorite?: boolean;
}

export interface VideoRequest {
  part: 'snippet';
  maxResults: number;
  order: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
  pageToken?: string;
  q: string; // search query
  safeSearch: 'moderate' | 'none' | 'strict';
  type: 'video'; // only videos
}

export interface VideoResponse {
  kind: string;
  etag: any;
  nextPageToken: string;
  prevPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Video[]; // array of videos
}
