import glob
import os
from tensorflow import keras
from tempfile import TemporaryDirectory
for f in glob.glob('./**/*.h5', recursive=True):
    print(f"\n\n\nConverting {f}")
    
    model = keras.models.load_model(f)
    saved_model = TemporaryDirectory().name
    out_file = f.replace("h5", "onnx")
    
    # Saved h5 model into .pb compiled graph
    keras.models.load_model(f).save(saved_model)

    # Convert the pb file into onnx IR
    command = f"python -m tf2onnx.convert --saved-model \"{saved_model}\" --output \"{out_file}\""
    print(f"Running command: {command}")
    # execute the command to convert the file
    os.system(command)