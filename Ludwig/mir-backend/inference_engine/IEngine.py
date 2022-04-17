from abc import ABCMeta
import numpy as np
from typing import Any, List, Protocol

class IEngine( Protocol):
    """Inference Engine Interface

    Declares all the operatins that an Inference Engine must implement.

    Args:
        ABCMeta: The ABCMeta class.
    """
    def infer(self, mfccs: np.ndarray) -> Any:
        """Infer the the audio file.

        Args:
            mfccs (np.ndarray): Batch (N) of MFFCCS to implement  SHAPE = (N, 130, 32, 1)

        Raises:
            NotImplemented: _description_
        """
        ...