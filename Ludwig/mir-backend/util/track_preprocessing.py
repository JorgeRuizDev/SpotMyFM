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
    r = requests.get(preview_url)

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        tmp.write(r.content)
        return tmp.name


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
    Returns the input data for the model

    Args:
        track_path (str): Path to the track
    """
    track = mfcc.track2mfccs(track_path)

    if normalize:
        track = mfcc.normalize_mfccs(track)
    
    return track
