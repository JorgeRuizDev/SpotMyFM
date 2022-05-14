import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import Styled from "./LudwigDropZone.styles";

interface ILudwigDropZoneProps {}

function LudwigDropZone(props: ILudwigDropZoneProps): JSX.Element {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);

    if (acceptedFiles.length == 0){
      return toast.error("Invalid File Type, Only Audio Files Allowed");
    }else if (acceptedFiles.length > 1){
      return toast.error("Only one file can be uploaded at a time");
    }
    console.log(acceptedFiles)
  }, []);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop, accept: {"audio/*": []} });

  return (
    <div {...getRootProps()}>
      <Styled.Container isDragAccept={isDragAccept} isFocused={isFocused} isDragReject={isDragReject}>
        <Styled.BgIcon/>  
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop one audio file here, or click to select files</p>
        )}

        
      </Styled.Container>
    </div>
  );
}

export default LudwigDropZone;
