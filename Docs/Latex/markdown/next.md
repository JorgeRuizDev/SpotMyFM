# SpotMyFM Api Specification

The SpotMyFM OpenAPI Swagger Specification

## Version: 0.1.9

### /database/albums/tagAlbums

#### GET

##### Summary:

Gets the tagged albums and their tags from the user

##### Description:

Gets the tagged albums and their tags from the user.
The user is identified with the JWT Token

##### Responses

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | The album tags were retrieved. |
| 400  | Bad Request                    |
| 403  | Not Authorized (Bad Token)     |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| jwt             |        |

#### POST

##### Summary:

Updates the album tags

##### Description:

Updates the album tags
The user is identified with the JWT Token
There is a limit of 50 album tags per request

##### Responses

| Code | Description                    |
| ---- | ------------------------------ |
| 200  | The album tags were retrieved. |
| 400  | Bad Request                    |
| 403  | Not Authorized (Bad Token)     |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| jwt             |        |

### /database/user/drop

#### POST

##### Summary:

Drops the current user document identified by the JWT Token

##### Description:

This endpoint tries to remove all the stored user's data from the database.

##### Responses

| Code | Description                                          |
| ---- | ---------------------------------------------------- |
| 200  | The user was successfully removed from the database. |
| 400  | Bad Request                                          |
| 403  | Not Authorized (Bad Token)                           |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| jwt             |        |

### /lastFM/getBulkAlbumTags

#### POST

##### Summary:

Gets album tags of given album names and artists

##### Description:

The endpoint only alllows a maximum of 50 pairs artist-album per request.

##### Responses

| Code | Description             |
| ---- | ----------------------- |
| 200  | A successful operation. |
| 400  | Bad Request             |
| 403  | Not Authorized          |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| jwt             |        |

### /ludwig/track/bulk

#### POST

##### Summary:

Analyzes a bulk of songs

##### Description:

This endpoint analyzes as bulk of songs, extracting the genre, subgenres and moods of each song.

##### Responses

| Code | Description             |
| ---- | ----------------------- |
| 200  | A successful operation. |
| 400  | Bad Request             |
| 403  | Not Authorized          |

##### Security

| Security Schema | Scopes |
| --------------- | ------ |
| jwt             |        |

### /spotify/oauth2/auth

#### POST

##### Summary:

Obtains the Spotify Auth Code used in OAUTH2

##### Description:

This endpoint retrieves the authorization code from Spotify Api that is used in every single Spotify Endpoint.

It also serves as the main auth pipeline of SpotMyFM as it generates the JWS token used along all the endpoints.

Requirements:

- Response Code
- Authorized Url Callback

##### Responses

| Code | Description                                |
| ---- | ------------------------------------------ |
| 200  | The Auth and JWT Token have been generated |
| 400  | Bad Request                                |

### /spotify/oauth2/refresh

#### POST

##### Summary:

Obtains the Spotify Auth Code used in OAUTH2 given a Valid Refresh Token

##### Description:

This endpoint refreshes the authorization code from Spotify Api that is used in every single Spotify Endpoint.

It also serves as the main refresh token pipeline of SpotMyFM as it generates the JWS token used along all the endpoints.

Requirements:

- Refresh Token (obtained from /spotify/oauth2/auth)

##### Responses

| Code | Description                                |
| ---- | ------------------------------------------ |
| 200  | The Auth and JWT Token have been generated |
| 400  | Bad Request                                |

### Models

#### Error

| Name  | Type   | Description | Required |
| ----- | ------ | ----------- | -------- |
| error | string |             | No       |

#### Ok

| Name    | Type   | Description | Required |
| ------- | ------ | ----------- | -------- |
| message | string |             | No       |

#### PutAlbumTagsReq

| Name | Type       | Description | Required |
| ---- | ---------- | ----------- | -------- |
| tags | [ object ] |             | Yes      |

#### MirResult

Music Information Retrieval Result (includes the confidence of each label)

| Name       | Type   | Description | Required |
| ---------- | ------ | ----------- | -------- |
| label      | string |             | No       |
| confidence | number |             | No       |

#### MirRequest

| Name   | Type       | Description                                        | Required |
| ------ | ---------- | -------------------------------------------------- | -------- |
| moods  | boolean    | If the result should include moods                 | No       |
| genres | boolean    | If the result should include genres and subgenres. | No       |
| tracks | [ object ] |                                                    | Yes      |

#### LudwigRes

| Name   | Type       | Description | Required |
| ------ | ---------- | ----------- | -------- |
| tracks | [ object ] |             | Yes      |

#### AlbumTagsRes

| Name | Type       | Description | Required |
| ---- | ---------- | ----------- | -------- |
| tags | [ object ] |             | Yes      |

#### SpotifyRefreshReq

| Name         | Type   | Description                                             | Required |
| ------------ | ------ | ------------------------------------------------------- | -------- |
| refreshToken | string | OAUTH2 Refresh Token obtained from /spotify/oauth2/auth | Yes      |

#### SpotifyAuthReq

| Name         | Type   | Description                           | Required |
| ------------ | ------ | ------------------------------------- | -------- |
| redirectUri  | string | Redirect Uri (Same as Response Code)  | Yes      |
| responseCode | string | Response Code from the Spotify Server | Yes      |

#### SpotifyAuthRes

| Name          | Type   | Description                                 | Required |
| ------------- | ------ | ------------------------------------------- | -------- |
| access_token  | string | Valid Spotify Token                         | Yes      |
| expires_in    | number | Token TTL (in seconds)                      | Yes      |
| token         | string | Signed JWT used in every endpoint as Auth.  | No       |
| refresh_token | string | Token used in the /spotify/refresh endpoint | Yes      |
| token_type    | string | Http token Type (Possibly "Bearer")         | Yes      |

#### LastFMTagReq

| Name   | Type       | Description | Required |
| ------ | ---------- | ----------- | -------- |
| albums | [ object ] |             | Yes      |

#### LastFMTagResponse

| Name       | Type                        | Description | Required |
| ---------- | --------------------------- | ----------- | -------- |
| album_tags | [ [LastFMTag](#lastfmtag) ] |             | Yes      |

#### LastFMTag

| Name     | Type       | Description | Required |
| -------- | ---------- | ----------- | -------- |
| album_id | string     |             | No       |
| tags     | [ object ] |             | No       |
