import { ExternalUrls, Image, Tracks } from "./track";
import { Followers } from "./User";

export interface Owner {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
  }

export interface Playlist {
    collaborative: boolean;
    description: null;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
  } 