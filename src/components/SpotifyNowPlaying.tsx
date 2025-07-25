import React, { useState, useEffect, forwardRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Play, Plus, MoreHorizontal, ExternalLink } from 'lucide-react';
import { spotifyAPI } from '@/lib/spotify';

interface SpotifyTrack {
    id: string;
    name: string;
    artist: string;
    album: string;
    image: string;
    preview_url: string | null;
    external_url: string;
    is_playing?: boolean;
}

interface SpotifyData {
    currently_playing: SpotifyTrack | null;
    recently_played: SpotifyTrack[];
    top_tracks: SpotifyTrack[];
}

const SpotifyNowPlaying = forwardRef<HTMLElement>((props, ref) => {
    const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
    const [activeTab, setActiveTab] = useState<'recently' | 'top'>('recently');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Mock data for demonstration - replace with actual Spotify API integration
    const mockSpotifyData: SpotifyData = {
        currently_playing: {
            id: '1',
            name: 'Could You Love Me?',
            artist: 'elijah woods',
            album: 'Preview',
            image: '/api/placeholder/400/400',
            preview_url: null,
            external_url: 'https://open.spotify.com/track/example',
            is_playing: true
        },
        recently_played: [
            {
                id: '2',
                name: 'Constellations',
                artist: 'Keenan Te',
                album: 'Preview',
                image: '/api/placeholder/400/400',
                preview_url: null,
                external_url: 'https://open.spotify.com/track/example2'
            },
            {
                id: '3',
                name: 'Heart Race',
                artist: 'Fly By Midnight',
                album: 'Preview',
                image: '/api/placeholder/400/400',
                preview_url: null,
                external_url: 'https://open.spotify.com/track/example3'
            },
            {
                id: '4',
                name: 'Shift',
                artist: 'The Rose',
                album: 'Preview',
                image: '/api/placeholder/400/400',
                preview_url: null,
                external_url: 'https://open.spotify.com/track/example4'
            }
        ],
        top_tracks: [
            {
                id: '5',
                name: 'Song of the Stars',
                artist: 'TOMORROW X TOGETHER',
                album: 'Preview',
                image: '/api/placeholder/400/400',
                preview_url: null,
                external_url: 'https://open.spotify.com/track/example5'
            }
        ]
    };

    useEffect(() => {
        const fetchSpotifyData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if Spotify credentials are configured
                if (!import.meta.env.VITE_SPOTIFY_CLIENT_ID || !import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN) {
                    // Use mock data if no credentials are configured
                    setSpotifyData(mockSpotifyData);
                    setLoading(false);
                    return;
                }

                // Fetch real Spotify data
                const [currentlyPlaying, recentlyPlayed, topTracks] = await Promise.all([
                    spotifyAPI.getCurrentlyPlaying(),
                    spotifyAPI.getRecentlyPlayed(4),
                    spotifyAPI.getTopTracks('medium_term', 4)
                ]);

                const data: SpotifyData = {
                    currently_playing: currentlyPlaying?.item && currentlyPlaying.is_playing
                        ? { ...spotifyAPI.transformTrackData(currentlyPlaying.item), is_playing: true }
                        : null,
                    recently_played: recentlyPlayed?.items.map(item =>
                        spotifyAPI.transformTrackData(item.track)
                    ) || [],
                    top_tracks: topTracks?.items.map(track =>
                        spotifyAPI.transformTrackData(track)
                    ) || []
                };

                setSpotifyData(data);
            } catch (err) {
                console.error('Error fetching Spotify data:', err);
                // Fallback to mock data on error
                setSpotifyData(mockSpotifyData);
            } finally {
                setLoading(false);
            }
        };

        fetchSpotifyData();

        // Refresh data every 30 seconds
        const interval = setInterval(fetchSpotifyData, 30000);
        return () => clearInterval(interval);
    }, []);

    const TrackCard: React.FC<{ track: SpotifyTrack; size?: 'large' | 'small' }> = ({
        track,
        size = 'small'
    }) => (
        <Card className={`card-hover transition-all duration-300 hover:shadow-lg ${size === 'large' ? 'col-span-2' : ''
            }`}>
            <div className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                <div className={`relative flex-shrink-0 ${size === 'large' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-10 h-10 sm:w-12 sm:h-12'}`}>
                    <img
                        src={track.image}
                        alt={`${track.name} cover`}
                        className="w-full h-full rounded-lg object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                    />
                    {track.is_playing && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse" />
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h4 className={`font-semibold text-foreground truncate ${size === 'large' ? 'text-base sm:text-lg' : 'text-sm'
                        }`}>
                        {track.name}
                    </h4>
                    <p className={`text-muted-foreground truncate ${size === 'large' ? 'text-sm sm:text-base' : 'text-xs'
                        }`}>
                        {track.artist}
                    </p>
                    {size === 'large' && (
                        <Badge variant="secondary" className="mt-1 sm:mt-2 text-xs">
                            {track.album}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <Button size="sm" variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-6 w-6 sm:h-8 sm:w-8 p-0">
                        <MoreHorizontal className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <Button
                        size="sm"
                        className="h-6 w-6 sm:h-8 sm:w-8 p-0 rounded-full"
                        onClick={() => window.open(track.external_url, '_blank')}
                    >
                        <Play className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );

    if (loading) {
        return (
            <section ref={ref} className="py-12 bg-background/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center gap-3">
                                <Music className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                                <h3 className="text-xl sm:text-2xl font-bold">What I'm Listening To</h3>
                            </div>
                        </div>
                        <div className="animate-pulse space-y-4">
                            <div className="h-16 sm:h-20 bg-muted rounded-lg" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="h-12 sm:h-16 bg-muted rounded-lg" />
                                <div className="h-12 sm:h-16 bg-muted rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section ref={ref} className="py-12 bg-background/50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section ref={ref} className="py-12 bg-background/50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8 fade-up">
                        <div className="flex items-center gap-3">
                            <Music className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                            <h3 className="text-xl sm:text-2xl font-bold">What I'm Listening To</h3>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open('https://open.spotify.com/user/31addiubvj4izwbgbkfqnb5xkr7y', '_blank')}
                            className="flex items-center gap-2 text-xs sm:text-sm"
                        >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            View on Spotify
                        </Button>
                    </div>

                    {/* Currently Playing */}
                    {spotifyData?.currently_playing && (
                        <div className="mb-6 sm:mb-8 fade-up" style={{ animationDelay: "0.1s" }}>
                            <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs sm:text-sm font-medium text-green-500">Now Playing</span>
                            </div>
                            <TrackCard track={spotifyData.currently_playing} size="large" />
                        </div>
                    )}

                    {/* Tab Navigation */}
                    <div className="flex gap-1 mb-6 fade-up" style={{ animationDelay: "0.2s" }}>
                        <Button
                            variant={activeTab === 'recently' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('recently')}
                            className="rounded-full"
                        >
                            Recently Played
                        </Button>
                        <Button
                            variant={activeTab === 'top' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('top')}
                            className="rounded-full"
                        >
                            Top Tracks
                        </Button>
                    </div>

                    {/* Track Lists */}
                    <div className="space-y-4 fade-up" style={{ animationDelay: "0.3s" }}>
                        {activeTab === 'recently' && (
                            <>
                                {spotifyData?.recently_played.length > 0 ? (
                                    spotifyData.recently_played.map((track) => (
                                        <TrackCard key={track.id} track={track} />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">No recently played tracks found</p>
                                    </div>
                                )}
                            </>
                        )}
                        {activeTab === 'top' && (
                            <>
                                {spotifyData?.top_tracks.length > 0 ? (
                                    spotifyData.top_tracks.map((track) => (
                                        <TrackCard key={track.id} track={track} />
                                    ))
                                ) : (
                                    <div className="text-center py-8">
                                        <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-muted-foreground">No top tracks found</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 fade-up" style={{ animationDelay: "0.4s" }}>
                        <p className="text-sm text-muted-foreground">
                            Music taste updates in real-time from my Spotify profile
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
});

SpotifyNowPlaying.displayName = "SpotifyNowPlaying";

export default SpotifyNowPlaying;
