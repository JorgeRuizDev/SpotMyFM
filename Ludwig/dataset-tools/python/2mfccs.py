import glob
from typing import Any, Union
import librosa
import numpy as np
import os

# The sample rate of the audio file.
SAMPLE_RATE = 22050

# The length of the track in seconds.
TRACK_LENGTH = 30

# Calculating the number of samples in a track.
TRACK_SAMPLES = 22050 * TRACK_LENGTH

# The number of splits that the track will be split into.
SPLITS = 10

# Dividing the number of samples in a track by the number of splits.
SAMPLES_PER_SPLIT = TRACK_SAMPLES // SPLITS

# The number of Mel-frequency cepstral coefficients (MFCCs) to return.
N_MELS = 32

def split_track(y, samples_per_split = SAMPLES_PER_SPLIT):
    """
    It takes a track and splits it into a list of tracks, each of which is SAMPLES_PER_SPLIT samples
    long
    
    Args:
      y: the audio track
      samples_per_split: The number of samples in each split.
    
    Returns:
      A list of numpy arrays.
    """
    return [y[slice_samp:slice_samp + samples_per_split] for slice_samp in range(0, len(y), samples_per_split) ]

def normalize_mfccs(mfcc_feat: np.ndarray):
    """
    It takes a 2D array of MFCC features and subtracts the mean of each column from each element in that
    column
    
    Args:
      mfcc_feat (np.ndarray): the mfcc features of the audio file
    
    Returns:
      The mean of the mfcc_feat is subtracted from the mfcc_feat.
    """
    return np.subtract(mfcc_feat,np.mean(mfcc_feat))

def preprocess_track(signal: Union[np.ndarray, Any], sr=SAMPLE_RATE):
    """
    It takes a signal and returns a matrix of Mel-frequency cepstral coefficients (MFCCs).
    
    Args:
      signal (Union[np.ndarray, Any]): the audio signal
      sr: sample rate
    
    Returns:
      A numpy array of shape (20, 87)
    """
    mfccs = librosa.feature.mfcc(y=signal, n_mfcc=N_MELS, sr=sr)

    return mfccs

def main():

    out = "./out/mfccs"
    source = "./out/wav"
    extension = "wav"
    
    

    for f in glob.glob(f"{source}/**/*.{extension}", recursive=True):
        name = f.replace(source, "").replace("\\", "/").split(".")[0]    

        out_dir = f'{out}{"/".join(name.split("/")[:-1])}'
        os.makedirs(out_dir, exist_ok=True)
        track , sr = librosa.load(f)

        splits = split_track(track)

        mfccs = []
        for i, split in enumerate(splits):
                if (len(split) == SAMPLES_PER_SPLIT):
                    mfccs.append(np.array(preprocess_track(split, sr)))
        np.save(f"{out}/{name}", np.array(mfccs))        


if __name__ == "__main__":
    main()