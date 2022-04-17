import tempfile
from fastapi import FastAPI, UploadFile
from typing import Optional
from inference_engine.MoodEngine import MoodEngine
from requests_sepecifications.body import LudwigTrackUrl
from util import track_preprocessing as tp
from time import time

app = FastAPI()

__moodIE = MoodEngine()

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
    start_time = time()
    track_path = tp.download_track_from_preview(body.url)
    track_path = tp.to_wav(track_path)
    input_data = tp.get_input_data(track_path)
    res = __moodIE.infer(input_data)[0]
    

    return {"mood" : __moodIE.res_to_dic(res) if body.moods else None, "genre": None, "subgenres": None , "took": time() - start_time}  


@app.post("/ludwig/track/file")
async def spotify_mir_file_upload(
    file: UploadFile,
    moods: Optional[bool] = True,
    genres: Optional[bool] = True,
    subgenres: Optional[bool] = True,
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
        tmp.write(file.file.read())
        track = tmp.name
        track_path = tp.to_wav(track)
        input_data = tp.get_input_data(track_path)
        
        res = __moodIE.infer(input_data)[0]
        return {"mood" : __moodIE.res_to_dic(res) if moods else None, "genre": None, "subgenres": None}
    

