# Spotify Dataset Downloader

Small script that downloads all the track previews of a given playlists as .mp3 files.

## Instructions:

### Requirements:

- NodeJS (Tested with v16.10.0) A valid Spotify Api Key

### Build & Run

Open a terminal in the folder that contains the `package.json` file:

**Install The Dependencies/Packages:**

    npm install

Transpile The Script:

    npx tsc

Run the Script (Linux)

    SPOTIFY_TOKEN=YOUR_TOKEN_HERE
    node .\dist\app.js -u  spotify:playlist:37i9dQZF1DWZtZ8vUCzche -o "./true_detective" -t $SPOTIFY_TOKEN

Where

- -u: Spotify Playlist Uri (spotify:<playlist|album>:<spotify_id>)
- -o: Output Folder Path (Will be cr
