import json
from typing import List
import numpy as np
from inference_engine.IEngine import IEngine
import onnxruntime as ort
from inference_engine.__genre_engine.inferenceNode import InferenceNode
from inference_engine.__genre_engine.json_spec import InferenceRequest, NetworkJson


class GenreEngine(IEngine):
    def __init__(self, json_path: str = "./models/genres.json"):
        """ Initialize the engine.

        Args:
            json_path (str): Path to the JSON config file that has all the models and labels.
        """
        self.__json_model: NetworkJson = json.load(open(json_path, "r"))
        self.__composite_engine = InferenceNode(self.__json_model["models"][0])

    def infer(self, mfccs: List[InferenceRequest]):
        return self.__composite_engine.infer(mfccs)



