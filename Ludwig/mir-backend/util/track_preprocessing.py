from time import time
import traceback
from typing import List, Tuple, Union
import ffmpeg
import tempfile
import numpy as np
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
    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
    }
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

    async with aiohttp.ClientSession(
        loop=loop, connector=aiohttp.TCPConnector(verify_ssl=False)
    ) as session:
        results = await asyncio.gather(
            *[fetch(session, url) for url in preview_urls], return_exceptions=True
        )
        return results


def to_wav(track_path: str):
    """
    Converts an mp3 file to a wav file with a sample rate of 22050

    Args:
        track_path (str): _description_
    """
    print(f"Converting {track_path} to wav")
    try:
        output_name = f"{track_path}.wav"
        # ffmpeg disable log level

        ffmpeg.input(track_path).output(
            output_name, acodec="pcm_s16le", ar="22050"
        ).run(quiet=True)

        return output_name
    except Exception:
        print(f"Could not convert {track_path} to wav")
        return None


def get_input_data(
    track_path: str, normalize=True
) -> Union[Tuple[None, None], Tuple[np.ndarray, np.ndarray]]:
    """
    It takes a path to a track, and returns the MFCCs and the track

    Args:
      track_path (str): the path to the track you want to get the MFCCs for
      normalize: If True, normalize the MFCCs to have zero mean and unit variance. Defaults to True

    Returns:
      The mfccs and the track
    """

    if track_path is "":
        print("Skipping Missing Track")
        return None, None
    try:
        mfccs, track = mfcc.track2mfccs(track_path)

        if normalize:
            track = mfcc.normalize_mfccs(mfccs)

        return mfccs, track
    except Exception:
        print(f"Could not get mfccs for {track_path}: Trace: {traceback.format_exc()}")
        return None, None
