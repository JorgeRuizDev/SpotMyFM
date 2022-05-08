from typing import List, Tuple
import onnxruntime as ort
import numpy as np
from inference_engine.IEngine import IEngine
from inference_engine.__execution_providers import EXECUTION_PROVIDERS
from inference_engine.__genre_engine.json_spec import InferenceRequest


MOODS = ["happy", "sad", "party", "relaxed", "acoustic", "electronic", "aggressive"]


class MoodEngine(IEngine):
    def __init__(self, model_path="models/moods/moods.onnx"):
        """
        Initialize the engine.

        Args:
            model_path (str): Path to the ONNX model.
        """
        self.__model_path = model_path
        
        self.__start_session()
        self.__input = self.__session.get_inputs()[0].name  # input tensor name
        self.__output = self.__session.get_outputs()[0].name  # output tensor name

    def __start_session(self):
        self.__session = ort.InferenceSession(self.__model_path, providers=EXECUTION_PROVIDERS)

    def infer(self, requests: List[InferenceRequest]):
        """
        The function takes a list of InferenceRequest objects, each of which contains a list of MFCCs. The
        function then runs the ONNX model on the list of MFCCs, and returns a list of InferenceRequest
        objects, each of which contains a list of moods and their confidence scores
        
        Args:
          requests (List[InferenceRequest]): List[InferenceRequest]
        """

        mfccs = []

        for req in requests:
            mfccs.extend(req.splits)

        # run onnxruntime inference session:
        self.__start_session()
        results = self.__session.run([self.__output], {self.__input: mfccs})[0]
        del self.__session
        for req in requests:
            
            res = results[:req.n_splits]
            results = results[req.n_splits:]

            res = res.mean(axis=0)

            moods: List[Tuple[str, float]] = []
            for mood, confidence in zip(MOODS, res):
                moods.append((mood, float(confidence)))

            req.moods = moods


        return requests

    def res_to_dic(self, res: np.ndarray):
        """
        Returns an JSON like object with the voted moods given an inference result 
        
        (Matrix with each mood probability of a SINGLE TRACK)
        """

        res = res.mean(axis=0)
        res_binary = [1 if x > 0.5 else 0 for x in res]

        return {mood: not not res_binary[i] for i, mood in enumerate(MOODS)}
