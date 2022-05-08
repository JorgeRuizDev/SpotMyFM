from dataclasses import dataclass
from typing import List, Literal, Optional, Tuple, TypedDict

import numpy as np


class InferenceNodeJson(TypedDict):
    model_path: str
    name: str
    type: Literal["genre", "subgenre"]
    labels: List[str]
    children: Optional[List["InferenceNodeJson"]]


class NetworkJson(TypedDict):
    version: str
    models: List[InferenceNodeJson]

@dataclass
class InferenceRequest():

    def __init__(self, track_id: str, mfccs: np.ndarray):
        self.id = track_id
        self.splits =np.expand_dims(mfccs, axis=3)
        self.n_splits = len(mfccs)
        self.genre: List[Tuple[str, float]] = []
        self.subgenres: List[Tuple[str, float]] = []
        self.moods: List[Tuple[str, float]] = []

    splits: np.ndarray
    n_splits: int



    def to_json(self,):
        return {
            "id": self.id,
            "genres": [{"label": g[0], "confidence": g[1]} for g in self.genre or []],
            "subgenres": [{"label": s[0], "confidence": s[1]} for s in self.subgenres or []],
            "moods": [{"label": m[0], "confidence": m[1]} for m in self.moods or []]
        }

    def __str__(self) -> str:
        return f"{self.__class__.__name__}(splits={self.splits}, n_splits={self.n_splits}, genre={self.genre}, subgenres={self.subgenres})"
    
    def __repr__(self) -> str:
        return self.__str__()