import TrackView from "components/core/cards/views/TrackView";
import { useEffect } from "react";
import { useClientsStore } from "store/useClients";
import tracks from "./tracks"
export default function TrackDemo() {
  const setIsPremium = useClientsStore(s => s.setIsPremium)

  useEffect(() => {setIsPremium(true)}, [setIsPremium ])

  return <TrackView tracks={tracks} isDemo={true}></TrackView>;
}
