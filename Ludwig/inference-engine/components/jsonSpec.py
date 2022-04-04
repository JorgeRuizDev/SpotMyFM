from typing import List, Literal, TypedDict

class InferenceNodeJson(TypedDict):
    model_path: str
    type: Literal["genre", "subgenre", "moods"]
    labels: List[str]
    chidlren: List["InferenceNodeJson"]

class NetworkJson(TypedDict):
    version: str
    root: InferenceNodeJson