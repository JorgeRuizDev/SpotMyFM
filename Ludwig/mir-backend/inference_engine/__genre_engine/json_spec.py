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

    def __init__(self, mffcs: np.ndarray):
        self.splits = mffcs
        self.n_splits = len(mffcs)

    splits: np.ndarray
    n_splits: int
    genre: Optional[List[Tuple[str, float]]]
    subgenres: Optional[List[Tuple[str, float]]]
    moods: Optional[List[Tuple[str, float]]]


    def __str__(self) -> str:
        return f"{self.__class__.__name__}(splits={self.splits}, n_splits={self.n_splits}, genre={self.genre}, subgenres={self.subgenres})"
    
    def __repr__(self) -> str:
        return self.__str__()