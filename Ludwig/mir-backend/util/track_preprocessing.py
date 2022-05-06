from time import time
from typing import List
import ffmpeg
import tempfile
import requests

from util import mfcc



def download_track_from_preview(preview_url: str) -> str:
    """
    Downloads a track from a spotify preview url

    Args:
        preview_url (str): Spotify Preview URL
    returns: Path name with the mp3 file 
    """
    start_time = time()
    header = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"}
    r = requests.get(preview_url, stream=True, allow_redirects=False, headers=header)
    print(f"Took {time() - start_time} seconds to download the track")
    
    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(r.content)
        return tmp.name

import aiohttp
import asyncio
async def download_multiple_from_preview(preview_urls: List[str], loop) -> List[str]:

    async def fetch(session, url):
        async with session.get(url) as response:
            res = await response.read()
            
            with tempfile.NamedTemporaryFile(delete=False) as tmp:
                tmp.write(res)
                return tmp.name


    async with aiohttp.ClientSession(loop=loop, connector=aiohttp.TCPConnector(verify_ssl=False)) as session:
        results = await asyncio.gather(*[fetch(session, url) for url in preview_urls], return_exceptions=True)
        return results


def to_wav(track_path: str):
    """
    Converts an mp3 file to a wav file with a sample rate of 22050

    Args:
        track_path (str): _description_
    """

    output_name = f"{track_path}.wav"
    ffmpeg.input(track_path).output(output_name, acodec="pcm_s16le", ar="22050").run()

    return output_name


def get_input_data(track_path: str, normalize = True):
    """
    It takes a path to a track, and returns the MFCCs and the track
    
    Args:
      track_path (str): the path to the track you want to get the MFCCs for
      normalize: If True, normalize the MFCCs to have zero mean and unit variance. Defaults to True
    
    Returns:
      The mfccs and the track
    """

    mfccs, track = mfcc.track2mfccs(track_path)

    if normalize:
        track= mfcc.normalize_mfccs(mfccs)
    
    return mfccs, track
