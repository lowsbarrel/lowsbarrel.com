interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface SpotifyTrack {
    id: string;
    name: string;
    artists: Array<{ name: string }>;
    album: {
        name: string;
        images: Array<{ url: string; height: number; width: number }>;
    };
    external_urls: {
        spotify: string;
    };
    preview_url: string | null;
}

interface SpotifyCurrentlyPlaying {
    is_playing: boolean;
    item: SpotifyTrack | null;
}

interface SpotifyRecentlyPlayed {
    items: Array<{
        track: SpotifyTrack;
        played_at: string;
    }>;
}

interface SpotifyTopTracks {
    items: SpotifyTrack[];
}

class SpotifyAPI {
    private clientId: string;
    private clientSecret: string;
    private refreshToken: string;
    private accessToken: string | null = null;
    private tokenExpiry: number = 0;

    constructor() {
        this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || '';
        this.clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET || '';
        this.refreshToken = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN || '';
    }

    private async getValidAccessToken(): Promise<string> {
        if (this.accessToken && Date.now() < this.tokenExpiry) {
            return this.accessToken;
        }

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: this.refreshToken
            })
        });

        if (!response.ok) {
            throw new Error('Failed to refresh Spotify token');
        }

        const data: SpotifyTokenResponse = await response.json();
        this.accessToken = data.access_token;
        this.tokenExpiry = Date.now() + (data.expires_in * 1000);

        return this.accessToken;
    }

    private async makeSpotifyRequest<T>(endpoint: string): Promise<T> {
        const token = await this.getValidAccessToken();

        const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Spotify API error: ${response.status}`);
        }

        return response.json();
    }

    async getCurrentlyPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
        try {
            const data = await this.makeSpotifyRequest<SpotifyCurrentlyPlaying>('/me/player/currently-playing');
            return data;
        } catch (error) {
            console.error('Error fetching currently playing:', error);
            return null;
        }
    }

    async getRecentlyPlayed(limit: number = 10): Promise<SpotifyRecentlyPlayed | null> {
        try {
            const data = await this.makeSpotifyRequest<SpotifyRecentlyPlayed>(`/me/player/recently-played?limit=${limit}`);
            return data;
        } catch (error) {
            console.error('Error fetching recently played:', error);
            return null;
        }
    }

    async getTopTracks(timeRange: 'short_term' | 'medium_term' | 'long_term' = 'medium_term', limit: number = 10): Promise<SpotifyTopTracks | null> {
        try {
            const data = await this.makeSpotifyRequest<SpotifyTopTracks>(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
            return data;
        } catch (error) {
            console.error('Error fetching top tracks:', error);
            return null;
        }
    }

    transformTrackData(track: SpotifyTrack): {
        id: string;
        name: string;
        artist: string;
        album: string;
        image: string;
        preview_url: string | null;
        external_url: string;
    } {
        return {
            id: track.id,
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            album: track.album.name,
            image: track.album.images[0]?.url || '/placeholder.svg',
            preview_url: track.preview_url,
            external_url: track.external_urls.spotify
        };
    }
}

export const spotifyAPI = new SpotifyAPI();
export type { SpotifyTrack, SpotifyCurrentlyPlaying, SpotifyRecentlyPlayed, SpotifyTopTracks };
