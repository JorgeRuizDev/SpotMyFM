import asyncio
from multiprocessing import Pool
from operator import ge
import tempfile
from fastapi import FastAPI, UploadFile
from typing import List, Optional

import numpy as np
from inference_engine.GenreEngine import GenreEngine
from inference_engine.MoodEngine import MoodEngine
from inference_engine.__genre_engine.json_spec import InferenceRequest
from requests_sepecifications.body import LudwigTrackUrl, LudwigTrackUrlBulk
from util import track_preprocessing as tp
from time import time

app = FastAPI()

__moodIE = MoodEngine()
__genre_engine = GenreEngine()


@app.get("/about")
@app.get("/")
async def root():
    return {"message": "Ludwing is a Music Information Retrieval (MIR) API"}


@app.post("/ludwig/track")
async def spotify_mir_url(body: LudwigTrackUrl):
    """
    Receives a track url and some flags as a parsed json body.

    Args:
        body (LudwigTrackUrl): _description_

    Returns:
        _type_: _description_
    """
    times = [time()]
    track_path = tp.download_track_from_preview(body.url)
    times.append(time())
    track_path = tp.to_wav(track_path)
    times.append(time())
    input_data = tp.get_input_data(track_path)[0]
    times.append(time())

    inference_request = [InferenceRequest(input_data)]

    if body.moods:
        _ = __moodIE.infer(inference_request)

    if body.genres:
        _ = __genre_engine.infer(inference_request)
    times.append(time())

    res = inference_request[0]
    return {
        **res.to_json(),
        "took": {
            "download": times[1] - times[0],
            "to_wav": times[2] - times[1],
            "get_input_data": times[3] - times[2],
            "inference": times[4] - times[3],
        },
    }


@app.post("/ludwig/track/bulk")
async def spotify_mir_url_bulk(body: LudwigTrackUrlBulk):
    """
    Receives a track url and some flags as a parsed json body.

    Args:
        body (LudwigTrackUrl): _description_

    Returns:
        _type_: _description_
    """

    times = [time()]
    # Download all the tracks
    loop = asyncio.get_event_loop()
    track_paths = await tp.download_multiple_from_preview(
        [u.url for u in body.tracks], loop
    )
    times.append(time())

    # multiprocessing: Convert with multiple processes the different tracks to wav
    input_data: List[np.ndarray] = []
    if len(track_paths) > 1:
        with Pool(3) as p:
            wav_tracks = p.map(tp.to_wav, track_paths)
            input_data = [data[0] for data in p.map(tp.get_input_data, wav_tracks)]
    else:
        wav_track = tp.to_wav(track_paths[0])
        input_data.append(tp.get_input_data(wav_track)[0])
    times.append(time())

    # Create the empty requests objects
    inference_requests = [InferenceRequest(data) for data in input_data]

    times.append(time())
    if body.moods:
        _ = __moodIE.infer(inference_requests)

    times.append(time())
    if body.genres:
        _ = __genre_engine.infer(inference_requests)
    times.append(time())

    res = inference_requests[0]

    response_dict = {
        track.id: inference_requests[i].to_json() for i, track in enumerate(body.tracks)
    }

    return {
        **response_dict,
        "took": {
            "download": times[1] - times[0],
            "to_wav": times[2] - times[1],
            "get_input_data": times[3] - times[2],
            "moods": times[4] - times[3],
            "genres": times[5] - times[4],
            "total": times[5] - times[0],
        }
    }


@app.post("/ludwig/track/file")
async def spotify_mir_file_upload(
    file: UploadFile,
    moods: Optional[bool] = True,
    genres: Optional[bool] = True,
):
    """
    Sent a file, returns the Mood, Genre and subgenres of the file (if specified)

    Args:
        file (UploadFile): ByteArray with an audio file
        moods (Optional[bool], optional): Return Track Moods. Defaults to True.
        genres (Optional[bool], optional): Return Track Genres. Defaults to True.
        subgenres (Optional[bool], optional): Return Track Subgenres. Defaults to True.
    """

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        times = [time()]
        tmp.write(file.file.read())
        times.append(time())
        track = tmp.name
        times.append(time())
        track_path = tp.to_wav(track)
        times.append(time())
        input_data, _ = tp.get_input_data(track_path)
        request = [InferenceRequest(input_data)]

        times.append(time())
        # Infer the moods
        if moods:
            _ = __moodIE.infer(request)
        times.append(time())

        # Infer the genres
        if genres:
            _ = __genre_engine.infer(request)
        times.append(time())
        return {
            **request[0].to_json(),
            "took": {
                "download": times[1] - times[0],
                "to_wav": times[2] - times[1],
                "get_input_data": times[3] - times[2],
                "inference": times[4] - times[3],
            },
        }
