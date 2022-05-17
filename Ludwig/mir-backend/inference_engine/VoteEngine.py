from typing import List
import pandas as pd 
from surprise import SVD
from surprise import Dataset
from surprise import get_dataset_dir
from surprise import Reader


class VoteEngine():

    def __init__(self, ):
        self.df = pd.read_csv("./models/track_votes.csv")

    def get_recommendations(self, track_ids: List[str]):
        """
        Get recommendations for a list of tracks
        """

        df = self.df.sample(frac=0.05)
        
        votes = []
        for track_id in track_ids:
            votes.append(["USER", track_id, 5])
        
        df = df.append(votes)

        reader = Reader(rating_scale=(1, 5))
        data = Dataset.load_from_df(df[["uId", "tId", "rating"]], reader)
        trainset = data.build_full_trainset()

        algo = SVD()
        algo.fit(trainset)

        
        recommendations = []

        for track in set(df["tId"]):
            if track not in track_ids:
                pred = algo.predict(track, "USER").est

                if pred > 4:
                    recommendations.append(( track, pred))

        # sort by second element of tuple
        recommendations = sorted(recommendations, key=lambda x: x[1], reverse=True)

        return [rec[0] for rec in recommendations[:10]]

        