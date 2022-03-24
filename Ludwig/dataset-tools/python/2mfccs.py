import glob
from typing import Any, Union
import librosa
import numpy as np
import os

SAMPLE_RATE = 22050

TRACK_LENGTH = 30

TRACK_SAMPLES = 22050 * TRACK_LENGTH

SPLITS = 10

SAMPLES_PER_SPLIT = TRACK_SAMPLES // SPLITS

N_MELS = 32

def split_track(y, samples_per_split = SAMPLES_PER_SPLIT):
    return [y[slice_samp:slice_samp + samples_per_split] for slice_samp in range(0, len(y), samples_per_split) ]

def normalize_mfccs(mfcc_feat: np.ndarray):
    return np.subtract(mfcc_feat,np.mean(mfcc_feat))

def preprocess_track(signal: Union[np.ndarray, Any], sr=SAMPLE_RATE):
    mfccs = librosa.feature.mfcc(y=signal, n_mfcc=N_MELS, sr=sr)

    return normalize_mfccs(mfccs)

def main():

    out = "./out/mfccs"
    source = "./out/wav"
    extension = "wav"


    for f in glob.glob(f"{source}/**/*.{extension}", recursive=True):
        name = f.replace(source, "").replace("\\", "/").split(".")[0]

        out_dir = f"{out}{name}"
    
        os.makedirs(out_dir)

        track , sr = librosa.load(f)

        splits = split_track(track)

        for i, split in enumerate(splits):
                if (len(split) == SAMPLES_PER_SPLIT):
                    res = np.array(preprocess_track(split, sr))
                    np.save(f"{out_dir}/{i}", res)
        


if __name__ == "__main__":
    main()