[![Codacy Badge](https://app.codacy.com/project/badge/Grade/59263c32ac374a6db9c9242d070040fd)](https://www.codacy.com/gh/JorgeRuizDev/SpotMyFM/dashboard?utm_source=github.com&utm_medium=referral&utm_content=JorgeRuizDev/SpotMyFM&utm_campaign=Badge_Grade)[![CodeQL](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/codeql-analysis.yml)[![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=spot-my-fm)](https://spotmyfm.jorgeruizdev.com/)[![Continuous Integration](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/ci.yml/badge.svg)](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/ci.yml)[![Cypress End2End Tests](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/cypress.yml/badge.svg)](https://github.com/JorgeRuizDev/SpotMyFM/actions/workflows/cypress.yml)
[![SpotMyFM](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/dx84qb&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/dx84qb/runs)

# SpotMyFM

## A Spotify Library Manager

### Check SpotMyFM at [spotmyfm.jorgeruizdev.com](spotmyfm.jorgeruizdev.com)

<hr/>

#### ¿What is SpotMyFM?

SpotMyFM is a Spotify Library Manager supported by artificial intelligence algorithms.

Please check the [Users Manual](./Manual/es/readme.md) for a detailed explanation of each of the features.

Some of the features are:

- **Advanced Library Filters**. Filter by popularity, moods, LastFM community tags, release date intervals or even genres!
- **Deep Learning Track Analysis**. Analyze any track with just a music file! Extract genres, subgenres and even moods😀!
- **Track Recommendatios**. SpotMyFM has a **small** collection of 30k songs to recommend. This recommendations are based on sound features, like Tempo, Beats and their power spectrogram.
- **Playlist Creation**. Create or extend an existing playlist with track recommendations or filter results.
- **Library/Playlist Stats**. Explore your personal stats like favourite genres, musical taste changes over time or mood and decades distribution.
- **Track/Album/Artist/Playlist details**. Navigate through your library! Explore all the tracks of a playlist, albums of an artist or even the tracks of each album with the details view. Read about the history of a band or album, get new recommendations or just check their genres, subgenres or moods!
- **Tag your album**. Tag and filter your album with custom strings that identify each album.

**And many more!**

<hr/>

#### Datasets

Three datasets were created through the development of this project. Two of them are published at Kaggle

[Ludwig Dataset - Genres, Subgenred & Moods - 13k+ Songs (Kaggle)](https://www.kaggle.com/datasets/jorgeruizdev/ludwig-music-dataset-moods-and-subgenres)

This is the main dataset that has been used to train all the neural networks

[Gtzan Extended Dataset - 3k Songs Dataset (Kagggle)](https://www.kaggle.com/datasets/jorgeruizdev/gtzan-extended-wav)

This dataset has been used to initialize the weights of the main neural network.

<hr/>

#### Teaser

![ezgif-5-abe8f0cb94](https://user-images.githubusercontent.com/10118909/177742138-b604abb5-9473-4f22-8cc8-fe1bd6cf8107.gif)

#### Architecture

![Poster](Docs/image.png)
