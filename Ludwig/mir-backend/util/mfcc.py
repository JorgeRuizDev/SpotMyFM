from typing import Any, Union
import librosa
import numpy as np


SAMPLE_RATE = 22050

TRACK_LENGTH = 30

TRACK_SAMPLES = 22050 * TRACK_LENGTH

SPLITS = 10

SAMPLES_PER_SPLIT = TRACK_SAMPLES // SPLITS

N_MELS = 32


def __split_track(y, samples_per_split=SAMPLES_PER_SPLIT):
    """
    Splits a track into samaller chunks of the given sample size

    Args:
        y (_type_): Librosa Singal
        samples_per_split (_type_, optional): Samples per split. Defaults to SAMPLES_PER_SPLIT.

    Returns:
        List[np.ndarray]: List of signals of the given sample size. Returns the last signal even if it smaller than samples_per_split.
    """
    return [
        y[slice_samp : slice_samp + samples_per_split]
        for slice_samp in range(0, len(y), samples_per_split)
    ]


def normalize_mfccs(mfcc_feat: np.ndarray):
    """
    Normalizes an MFFC

    Args:
        mfcc_feat (np.ndarray): MFCC to normalize
    Returns:
        _type_: The same np.ndarray with the same shape and dtype but normalized
    """    
    return np.subtract(mfcc_feat, np.mean(mfcc_feat))


def __preprocess_track(signal: Union[np.ndarray, Any], sr=SAMPLE_RATE):
    """
    Preprocesses a track
    In this case, returns a batch of MFCCs

    Args:
        signal (Union[np.ndarray, Any]): _description_
        sr (INT, optional): Sample Rate. Defaults to SAMPLE_RATE.

    Returns:
        _type_: A numpy array
    """
    mfccs = librosa.feature.mfcc(y=signal, n_mfcc=N_MELS, sr=sr)

    return mfccs


def track2mfccs(path: str, sample_rate=None):
    """
    Given a track path, returns a batch of MFCCs

    Pleas, specify the Sample Rate if its not 22050

    Args:
        path (str): Path to the track
        sample_rate (int, optional): Sample Rate. Defaults to SAMPLE_RATE.

    Returns:
        np.ndarray: A batch of MFCCs (They are not Normalized)
    """
    track, sr = librosa.load(path, sr=sample_rate)
    splits = __split_track(track)
    mfccs = []
    for split in splits:
        if len(split) == SAMPLES_PER_SPLIT:
            mfccs.append(np.array(__preprocess_track(split, sr)))

    return np.array(mfccs)
