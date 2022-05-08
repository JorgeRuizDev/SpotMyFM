import glob
from onnxruntime.quantization import quantize_dynamic, QuantType
import onnx

def quantize_onnx_model(onnx_model_path):
    quantized_model_path = onnx_model_path.replace(".onnx", "_quantized.onnx")

    onnx_opt_model = onnx.load(onnx_model_path)
    quantize_dynamic(onnx_model_path,
                     quantized_model_path,
                     weight_type=QuantType.QUInt8)

    print(f"quantized model saved to:{quantized_model_path}")


if __name__ == "__main__":
    for file in glob.glob("./**/*.onnx", recursive=True):
        if "quantized" in file:
            continue
            
        print(f"quantizing {file}")

        try:
            quantize_onnx_model(file)
        except:
            print(f"failed to quantize {file}")