# Spotify Integration Setup Guide

This guide will help you set up the Spotify integration for your portfolio website.

## Prerequisites

- A Spotify account (free or premium)
- A Spotify Developer account

## Step 1: Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create app"
4. Fill in the details:
   - **App name**: Your Portfolio Website
   - **App description**: Personal portfolio with music integration
   - **Website**: Your website URL
   - **Redirect URI**: `http://localhost:3000/callback` (for development)
5. Accept the terms and create the app

## Step 2: Get Your Credentials

1. In your newly created app, note down:
   - **Client ID**
   - **Client Secret** (click "Show client secret")

## Step 3: Get a Refresh Token

You'll need to authorize your app to access your Spotify data. Here's a simple way to do it:

### Option A: Using the Spotify Web API Console

1. Go to [Spotify Web API Console](https://developer.spotify.com/console/get-recently-played/)
2. Click "GET TOKEN"
3. Select the following scopes:
   - `user-read-recently-played`
   - `user-read-currently-playing`
   - `user-top-read`
4. Click "REQUEST TOKEN"
5. Copy the token (this is temporary, we'll convert it to a refresh token)

### Option B: Manual Authorization Flow

1. Replace `YOUR_CLIENT_ID` and create this URL:
```
https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=http://localhost:3000/callback&scope=user-read-recently-played%20user-read-currently-playing%20user-top-read
```

2. Visit the URL in your browser
3. Authorize the app
4. You'll be redirected to `http://localhost:3000/callback?code=AUTHORIZATION_CODE`
5. Copy the `code` parameter value

6. Exchange the code for a refresh token using this curl command:
```bash
curl -H "Authorization: Basic BASE64_ENCODED_CLIENT_CREDENTIALS" \
     -d grant_type=authorization_code \
     -d code=AUTHORIZATION_CODE \
     -d redirect_uri=http://localhost:3000/callback \
     https://accounts.spotify.com/api/token
```

Where `BASE64_ENCODED_CLIENT_CREDENTIALS` is the base64 encoding of `client_id:client_secret`.

You can encode it online or use: `echo -n "client_id:client_secret" | base64`

## Step 4: Configure Your Environment

1. Create a `.env.local` file in your project root:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

2. Add `.env.local` to your `.gitignore` file if it's not already there

## Step 5: Test the Integration

1. Restart your development server: `npm run dev`
2. Navigate to your BookAppointment page
3. You should see your real Spotify data instead of the mock data

## Troubleshooting

### "Failed to refresh Spotify token" Error
- Double-check your client ID and client secret
- Ensure your refresh token is valid and hasn't expired
- Make sure you've included all required scopes when generating the token

### CORS Issues
- Spotify API calls are made from the frontend, so make sure your domain is whitelisted
- For production, update the redirect URI in your Spotify app settings

### No Currently Playing Track
- Make sure you're actively playing music on Spotify
- The integration will show recently played tracks if nothing is currently playing

## Security Note

In a production environment, you should move the Spotify API calls to a backend server to keep your client secret secure. The current implementation is suitable for personal portfolios but not recommended for multi-user applications.

## Optional: Customize the Integration

You can modify the `SpotifyNowPlaying` component to:
- Change the number of tracks displayed
- Adjust the refresh interval
- Modify the styling to match your design
- Add click handlers for track preview playback
- Show different time ranges for top tracks (short_term, medium_term, long_term)

## Need Help?

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Spotify app settings
3. Ensure your environment variables are correctly set
4. Test your refresh token using the Spotify Web API Console
