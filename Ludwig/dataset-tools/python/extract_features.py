import glob
import json
from pprint import pprint
from time import time
from typing import Any, Union
import librosa
import numpy as np
import os
import pandas as pd

SAMPLE_RATE = 22050

TRACK_LENGTH = 30

TRACK_SAMPLES = 22050 * TRACK_LENGTH

SPLITS = 10

SAMPLES_PER_SPLIT = TRACK_SAMPLES // SPLITS

N_MELS = 32


def split_track(y, samples_per_split=SAMPLES_PER_SPLIT):
    return [
        y[slice_samp : slice_samp + samples_per_split]
        for slice_samp in range(0, len(y), samples_per_split)
    ]


def normalize_mfccs(mfcc_feat: np.ndarray):
    return np.subtract(mfcc_feat, np.mean(mfcc_feat))


def preprocess_track(signal: Union[np.ndarray, Any], sr=SAMPLE_RATE):
    mfccs = librosa.feature.mfcc(y=signal, n_mfcc=N_MELS, sr=sr)

    return mfccs


def main():

    out = "./out/mfccs"
    source = "./out/wav"
    extension = "wav"

    data = []

    labels = json.load(open("./out/labels.json", "r"))["tracks"]
    files = list(glob.glob(f"{source}/**/*.{extension}", recursive=True))
    for current_file_idx, f in enumerate(files):
        times = [time()]
        data_row = []

        name = f.replace(source, "").replace("\\", "/").split(".")[0]
        name = name.split("/")[-1]

        track_label = labels.get(name)

        if track_label is None:
            continue

        track, sr = librosa.load(f)

        splits = split_track(track)

        mfccs = []
        for i, split in enumerate(splits):
            if len(split) == SAMPLES_PER_SPLIT:
                mfccs.append(np.array(preprocess_track(split, sr)))
        times.append(time())
        concatenated = np.concatenate(mfccs, axis=1)

        # calculate the mean for each row of concatenated
        mfcc_means = np.mean(concatenated, axis=1)
        mfcc_vars = np.var(concatenated, axis=1)

        # extract the librosa beat position of the track
        tempo, beats = librosa.beat.beat_track(y=track, sr=sr)
        beats_mean = np.mean(beats)
        beats_var = np.var(beats)
        times.append(time())
        # extract the librosa chroma of the track

        chroma = librosa.feature.chroma_stft(y=track, sr=sr)

        chroma_mean = np.mean(chroma, axis=1)
        chroma_var = np.var(chroma, axis=1)
        times.append(time())
        # extract the librosa tlp of the track
        #tlp = librosa.feature.tonnetz(y=track, sr=sr)
        #tlp_mean = np.mean(tlp, axis=1)
        #tlp_var = np.var(tlp, axis=1)
        times.append(time())
        ## extract the librosa harmonic of the track
        #harmonic = librosa.effects.harmonic(y=track)
        #harmonic_mean = np.mean(harmonic)
        #harmonic_var = np.var(harmonic)
        times.append(time())
        # extract the librosa spectral centroid of the track
        spectral_centroid = librosa.feature.spectral_centroid(y=track, sr=sr)
        spectral_centroid_mean = np.mean(spectral_centroid)
        spectral_centroid_var = np.var(spectral_centroid)
        times.append(time())
        # extract the librosa spectral rolloff of the track

        spectral_rolloff = librosa.feature.spectral_rolloff(y=track, sr=sr)
        spectral_rolloff_mean = np.mean(spectral_rolloff)
        spectral_rolloff_var = np.var(spectral_rolloff)
        times.append(time())
        # extract the librosa spectral bandwidth of the track

        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=track, sr=sr)
        spectral_bandwidth_mean = np.mean(spectral_bandwidth)
        spectral_bandwidth_var = np.var(spectral_bandwidth)
        times.append(time())
        # extract the librosa spectral contrast of the track

        spectral_contrast = librosa.feature.spectral_contrast(y=track, sr=sr)
        spectral_contrast_mean = np.mean(spectral_contrast, axis=1)
        spectral_contrast_var = np.var(spectral_contrast, axis=1)
        times.append(time())
        
        aggressive = track_label["aggressive"]["N"]
        party = track_label["party"]["N"]
        sad = track_label["sad"]["N"]
        happy = track_label["happy"]["N"]
        acoustic = track_label["acoustic"]["N"]
        electronic = track_label["electronic"]["N"]

        aggressive = 1 if float(aggressive) > 0.5 else 0
        party = 1 if float(party) > 0.5 else 0
        sad = 1 if float(sad) > 0.5 else 0
        happy = 1 if float(happy) > 0.5 else 0
        acoustic = 1 if float(acoustic) > 0.5 else 0
        electronic = 1 if float(electronic) > 0.5 else 0

        data_row = [
            name, # 0
            mfcc_means.tolist(), # [1-33]
            mfcc_vars.tolist(), # [34-66]
            tempo, # 67
            beats_mean.tolist(), 
            beats_var.tolist(),
            chroma_mean.tolist(),
            chroma_var.tolist(),
            #tlp_mean.tolist(),
            #tlp_var.tolist(),
            #harmonic_mean,
            #harmonic_var,
            spectral_centroid_mean,
            spectral_centroid_var,
            spectral_rolloff_mean,
            spectral_rolloff_var,
            spectral_bandwidth_mean,
            spectral_bandwidth_var,
            spectral_contrast_mean.tolist(),
            spectral_contrast_var.tolist(),
            aggressive,
            party,
            sad,
            happy,
            acoustic,
            electronic,
        ]


        flatten_row = []
        for row in data_row:
            if isinstance(row, list):
                flatten_row += row
            else:
                flatten_row.append(row)
        print(f"{current_file_idx}/{len(files)}: {current_file_idx/len(files)*100:.2f}%    {name}")
        if False:
            print(name)
            print(f"MFCC Took {times[1] - times[0]} seconds")
            print(f"Beat Took {times[2] - times[1]} seconds")
            print(f"Chroma Took {times[3] - times[2]} seconds")
            print(f"TLP Took {times[4] - times[3]} seconds")
            print(f"Harmonic Took {times[5] - times[4]} seconds")
            print(f"Spectral Centroid Took {times[6] - times[5]} seconds")
            print(f"Spectral Rolloff Took {times[7] - times[6]} seconds")
            print(f"Spectral Bandwidth Took {times[8] - times[7]} seconds")
            print(f"Spectral Contrast Took {times[9] - times[8]} seconds")
        data.append(flatten_row)
    pd.DataFrame(data=data).to_csv("data.csv")
if __name__ == "__main__":
    main()
