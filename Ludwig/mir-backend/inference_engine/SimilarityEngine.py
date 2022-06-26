import librosa
import numpy as np
import pandas as pd

from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import BallTree

import pickle



class LudwigSimilarityRecommender:
    def __init__(
        self,
    ):
        self.__scaler = MinMaxScaler()

    def fit(self, X: pd.DataFrame):
        """
        The function takes in a dataframe, drops the first column, and then fits the dataframe to the
        BallTree algorithm
        
        Args:
          X (pd.DataFrame): pd.DataFrame
        
        Returns:
          The fit method returns the instance of the class.
        """
        X = X.drop("0", axis=1)
        # get the first pandas column as a numpy array:
        self.__ids = X.iloc[:, 0].values

        self.__scaler.fit(X)

        input_x = self.__scaler.transform(X)
        self.__ball_tree = BallTree(input_x)

        return self

    def __extract_features(self, mfccs: np.ndarray, track: np.ndarray):
        """
        It takes in a list of MFCCs and a track, and returns a list of features.
        
        Args:
          mfccs (np.ndarray): the MFCCs of the track
          track (np.ndarray): the audio track
        
        Returns:
          A numpy array of the features extracted from the audio file.
        """
        concatenated_mfccs = np.concatenate(mfccs, axis=1)

        mfcc_means = np.mean(concatenated_mfccs, axis=1)
        mfcc_vars = np.var(concatenated_mfccs, axis=1)

        # extract the librosa beat position of the track
        tempo, beats = librosa.beat.beat_track(y=track)
        beats_mean = np.mean(beats)
        beats_var = np.var(beats)

        # extract the librosa chroma of the track
        chroma = librosa.feature.chroma_stft(y=track)

        chroma_mean = np.mean(chroma, axis=1)
        chroma_var = np.var(chroma, axis=1)

        # extract the librosa spectral centroid of the track
        spectral_centroid = librosa.feature.spectral_centroid(y=track)
        spectral_centroid_mean = np.mean(spectral_centroid)
        spectral_centroid_var = np.var(spectral_centroid)

        # extract the librosa spectral rolloff of the track

        spectral_rolloff = librosa.feature.spectral_rolloff(y=track)
        spectral_rolloff_mean = np.mean(spectral_rolloff)
        spectral_rolloff_var = np.var(spectral_rolloff)

        # extract the librosa spectral bandwidth of the track

        spectral_bandwidth = librosa.feature.spectral_bandwidth(y=track)
        spectral_bandwidth_mean = np.mean(spectral_bandwidth)
        spectral_bandwidth_var = np.var(spectral_bandwidth)

        # extract the librosa spectral contrast of the track

        spectral_contrast = librosa.feature.spectral_contrast(y=track)
        spectral_contrast_mean = np.mean(spectral_contrast, axis=1)
        spectral_contrast_var = np.var(spectral_contrast, axis=1)

        features = [
            mfcc_means.tolist(),  # [1-33]
            mfcc_vars.tolist(),  # [34-66]
            tempo,  # 67
            beats_mean.tolist(),
            beats_var.tolist(),
            chroma_mean.tolist(),
            chroma_var.tolist(),
            spectral_centroid_mean,
            spectral_centroid_var,
            spectral_rolloff_mean,
            spectral_rolloff_var,
            spectral_bandwidth_mean,
            spectral_bandwidth_var,
            spectral_contrast_mean.tolist(),
            spectral_contrast_var.tolist(),
        ]

        
        flatten_row = []
        for row in features:
            if isinstance(row, list):
                flatten_row += row
            else:
                flatten_row.append(row)

        return np.array(flatten_row)

    def predict(self, mfccs: np.ndarray, track_signal: np.ndarray, k: int = 5):
        """
        > Given a track's mfccs and signal, extract its features, normalize them, and then find the k
        nearest neighbors in the ball tree
        
        Args:
          mfccs (np.ndarray): the mfccs of the track
          track_signal (np.ndarray): The audio signal of the track
          k (int): The number of nearest neighbors to return. Defaults to 5
        
        Returns:
          The indices of the k nearest neighbors.
        """
        features = self.__extract_features(mfccs, track_signal)

        # Normalize the track features 
        features = self.__scaler.transform([features])
        
        distances, indices = self.__ball_tree.query(features, k=k)
        return [self.__ids[i] for i in indices[0]]



class CustomUnpickler(pickle.Unpickler):

    def find_class(self, module, name):
        """
        If the name of the class is 'LudwigSimilarityRecommender', then return the class
        'LudwigSimilarityRecommender'
        
        Args:
          module: The name of the module that the class is in.
          name: The name of the recommender.
        
        Returns:
          The class LudwigSimilarityRecommender is being returned.
        """
        if name == 'LudwigSimilarityRecommender':
           
            return LudwigSimilarityRecommender
        return super().find_class(module, name)

similarity_recommender: LudwigSimilarityRecommender = CustomUnpickler(open("./models/ludwig_similar_recommender.pkl", "rb")).load()