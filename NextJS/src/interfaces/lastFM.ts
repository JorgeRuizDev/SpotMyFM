export interface LastfmTag {
  name: string;
  url: string;
}

export interface ILastFMAlbum {
  lastfmURL?: string;

  lastfmListenersCount?: number;

  lastfmPlayCount?: number;

  lastfmDescription?: string;
}

export interface ILastFMArtist {
  listeners: number;
  plays: number;
  name: string;
  url: string;
  bio: {
    summary: string;
    content: string;
    published: string;
  };
  tags: LastfmTag[];
}

export interface LastFMDetails {}
