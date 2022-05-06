from typing import Dict, List, Tuple

import numpy as np
from inference_engine.__genre_engine.json_spec import InferenceNodeJson
import onnxruntime as ort
from inference_engine.__execution_providers import EXECUTION_PROVIDERS
from inference_engine.__genre_engine.json_spec import InferenceRequest


def _genre_target(splits: np.ndarray, labels: List[str]):
    """
    Genre Target Function

    Gets the argmax of the sum of the splits and returns the label of the genre corresponding to that index

    Args:
        splits (np.ndarray): Network Output
        labels (List[str]): List of labels

    Returns:
        Single label
    """
    res = splits.mean(axis=0)
    genres: List[Tuple[str, float]] = []

    if labels[3] == "punk" and len(labels) == 3:
        res *= np.array([1, 1, 1/3])

    for i, confidence in enumerate(res):
        if confidence > 0.4:
            genres.append((labels[i], float(confidence)))
            
    if len(genres) == 0:
        idx = np.argmax(res)
        genres.append((labels[idx], float(res[idx])))

    return genres


def _subgenre_target(splits: np.ndarray, labels: List[str]):
    """
    Subgenre Target Function

    Gets the argmax of the mean of the splits and returns a list of labels corresponding to the indiceswith the subgenres
    """
    subs: List[Tuple[str, float]] = []
    
    mean = splits.mean(axis=0)

    for label, binary_res in zip(labels, mean):
        # 
        if binary_res > 0.4:
            subs.append((label, float(binary_res)))
        
    if len(subs) == 0:
        # if there ar no subs, add the largest with a confidence over 30%
        largest_idx = mean.argmax()

        
        subs.append((labels[largest_idx], float(mean[largest_idx])))

    return subs


class InferenceNode:
    """
        Inference Node Class, can have Inferece NOdes as children.
    """
    def __init__(self, node: InferenceNodeJson) -> None:
        """
        Initialize the inference node.

        Args:
            node (InferenceNodeJson): An dictionary extracted from a json with the class configuration.
        """
        self.__children = {child["name"]: InferenceNode(child) for child in node.get("children") or {}}
        self.__model_path = node["model_path"]
        self.__type = node["type"]
        self.__labels = node["labels"]
        self.__session = ort.InferenceSession(
            self.__model_path, providers=EXECUTION_PROVIDERS
        )

        self.__input = self.__session.get_inputs()[0].name  # input tensor name
        self.__output = self.__session.get_outputs()[0].name  # output tensor name

    def infer(self, requests: List[InferenceRequest]) -> List[InferenceRequest]:
        """Infers a batch of requests

        Args:
            requests (List[InferenceRequest]): List of requests

        Returns:
            List[InferenceRequest]: The input requests updated (Same list)
        """
        if len(requests) == 0:
            return []

        # Dict that stores the results of the inference grouped by label
        current_results: Dict[str, List[InferenceRequest]] = {
            name: [] for name in self.__labels
        }

        # reduce all the data splits into one python list

        input_data: List[np.ndarray] = []
        for data in requests:
            input_data.extend(data.splits)

        res = self.__session.run([self.__output], {self.__input: input_data})[0]

        for req in requests:
            res_split = np.array(res[: req.n_splits])
            res = res[req.n_splits :]
            
            if self.__type == "genre":
                req.genre = _genre_target(res_split, self.__labels)


                for genre in req.genre:
                    current_results[genre[0]].append(req)
            elif self.__type == "subgenre":
                req.subgenres = _subgenre_target(res_split, self.__labels)

        for child_name, req in current_results.items():
            if child_name in self.__children:
                self.__children[child_name].infer(req)
            
        return requests
