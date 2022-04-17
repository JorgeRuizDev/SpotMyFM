import onnxruntime as ort
import numpy as np
from inference_engine.IEngine import IEngine
from inference_engine.__execution_providers import EXECUTION_PROVIDERS


MOODS = ["happy", "sad", "party", "relaxed", "acoustic", "electronic", "aggressive"]


class MoodEngine(IEngine):
    def __init__(self, model_path="models/moods/moods.onnx"):
        """
        Initialize the engine.

        Args:
            model_path (str): Path to the ONNX model.
        """
        self.__model_path = model_path
        self.__session = ort.InferenceSession(model_path, providers=EXECUTION_PROVIDERS)

        self.__input = self.__session.get_inputs()[0].name  # input tensor name
        self.__output = self.__session.get_outputs()[0].name  # output tensor name

    def infer(self, mfccs: np.ndarray):
        """
        Infer the the audio file.

        Args:
            mfccs (np.ndarray): Batch (N) of MFFCCS to implement  SHAPE = (N, 130, 32)


        """
        input_data = np.expand_dims(mfccs, axis=3)
        # run onnxruntime inference session:
        res = self.__session.run([self.__output], {self.__input: input_data})
        return np.array(res)

    def res_to_dic(self, res: np.ndarray):
        """
        Returns an JSON like object with the voted moods given an inference result 
        
        (Matrix with each mood probability of a SINGLE TRACK)
        """

        res = res.mean(axis=0)
        res_binary = [1 if x > 0.5 else 0 for x in res]

        return {mood: not not res_binary[i] for i, mood in enumerate(MOODS)}
