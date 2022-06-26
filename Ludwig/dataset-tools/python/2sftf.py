import glob
import os
from typing import Any, Union
import librosa
import numpy as np

SAMPLE_RATE = 22050

TRACK_LENGTH = 30

TRACK_SAMPLES = 22050 * TRACK_LENGTH

SPLITS = int(TRACK_LENGTH // 2.56)

SAMPLES_PER_SPLIT = int(TRACK_SAMPLES // SPLITS)

N_MELS = 32


def split_track(y, samples_per_split=SAMPLES_PER_SPLIT):
    return [
        y[slice_samp : slice_samp + samples_per_split]
        for slice_samp in range(0, len(y), samples_per_split)
    ]


def preprocess_track(signal: Union[np.ndarray, Any], sr=SAMPLE_RATE):
    spectrogram = librosa.feature.melspectrogram(y=signal)
    print(spectrogram.shape)
    return spectrogram


def main():

    out = "./out/spectogram"
    source = "./out/wav"
    extension = "wav"


    for f in glob.glob(f"{source}/**/*.{extension}", recursive=True):
        name = f.replace(source, "").replace("\\", "/").split(".")[0]

        out_dir = f'{out}{"/".join(name.split("/")[:-1])}'
        os.makedirs(out_dir, exist_ok=True)
        track, sr = librosa.load(f)

        splits = split_track(track)

        spectograms = []
        for i, split in enumerate(splits):
            if len(split) == SAMPLES_PER_SPLIT:
                spectograms.append(np.array(preprocess_track(split, sr)))
        print(len(spectograms))
        np.save(f"{out}/{name}", np.array(spectograms))


if __name__ == "__main__":
    main()
