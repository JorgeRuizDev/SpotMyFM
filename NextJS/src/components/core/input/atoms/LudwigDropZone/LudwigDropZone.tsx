import {useCallback, useEffect, useState} from "react";
import {useDropzone} from "react-dropzone";
import {toast} from "react-toastify";
import Styled from "./LudwigDropZone.styles";
import config from "config";
import env from "env";
import axios from "util/axios";
import Modal from "components/core/display/molecules/Modal";
import LudwigResultsCard from "../../../cards/horizontalCards/LudwigResultsCard";
import {IMirResult} from "../../../../../interfaces/ludwig";
import {useClientsStore} from "../../../../../store/useClients";
import {useLoginStore} from "../../../../../store/useLogin";
import {useDataFacade} from "hooks/dataFacade/useDataFacade";
import {Track} from "data/cacheDB/dexieDB/models/Track";
import ta from "date-fns/esm/locale/ta/index.js";
import TrackView from "components/core/cards/views/TrackView";

interface ILudwigDropZoneProps {
}

function LudwigDropZone(props: ILudwigDropZoneProps): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    const [genres, setGenres] = useState<IMirResult[]>([]);
    const [moods, setMoods] = useState<IMirResult[]>([]);
    const [subgenres, setSubgenres] = useState<IMirResult[]>([]);
    const [filename, setFilename] = useState("");
    const isLogged = useLoginStore((s) => s.isLogged);
    const [ids, setIds] = useState<string[]>([]);
    const [tracks, setTracks] = useState<Track[]>([]);

    const {getTracksByIds} = useDataFacade();

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length == 0) {
            return toast.error("Invalid File Type, Only Audio Files Allowed");
        } else if (acceptedFiles.length > 1) {
            return toast.error("Only one file can be uploaded at a time");
        }

        const file = acceptedFiles[0];

        // Post file with axios to /api/upload
        // If successful, return the file name
        // If not, return error message
        const form = new FormData();
        form.append("file", file);

        // get axios object base url
        try {
            const response = await axios.post(
                `${config.api_endpoints.ludwig.analyze_file}`,
                form,
                {
                    baseURL: env.LUDWIG_BASE_URL,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            const d = response.data;
            setGenres(d.genres);
            setMoods(d.moods);
            setSubgenres(d.subgenres);
        } catch (e: any) {
            // get axios error message:
            const error = e.response.data.error;
            toast.error(`There was an error while analyzing the track: ${error}`);
        }

        try {
            const response = await axios.post(
                `${config.api_endpoints.ludwig.recommend_file}`,
                form,
                {
                    baseURL: env.LUDWIG_BASE_URL,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIds(response.data.spotify_ids);
        } catch (e: any) {
            const error = e.response.data.error;
            toast.error(
                `There was an error while getting the recommendations: ${error}`
            );
        }
        setShowModal(true);
        setFilename(file.name);
    }, []);
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        isDragActive,
    } = useDropzone({onDrop, accept: {"audio/*": []}});

    useEffect(() => {
        if (isLogged) {
            const fn = async () => {
                const tracks = await getTracksByIds(ids);
                setTracks(tracks);
            };
            fn();
        } else {
            toast.info("Log In to enjoy the full features of SpotMyFM and Ludwig");
        }
    }, [getTracksByIds, ids, isLogged]);

    return (
        <>
            <div {...getRootProps()}>
                <Styled.Container
                    isDragAccept={isDragAccept}
                    isFocused={isFocused}
                    isDragReject={isDragReject}
                >
                    <Styled.BgIcon/>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drag 'n' drop one audio file here, or click to select files</p>
                    )}
                </Styled.Container>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Styled.Layout>
                    <LudwigResultsCard
                        isLoading={false}
                        genres={genres}
                        moods={moods}
                        subgenres={subgenres}
                    />
                    <hr/>
                    <h3>Track Recommendations</h3>
                    {isLogged ? <TrackView tracks={tracks}/> : <>{ids.map((t, i) => <li key={i}><a
                        href={`https://open.spotify.com/track/${t}`}>Track {t}</a></li>)}</>}
                </Styled.Layout>
            </Modal>
        </>
    );
}

export default LudwigDropZone;
