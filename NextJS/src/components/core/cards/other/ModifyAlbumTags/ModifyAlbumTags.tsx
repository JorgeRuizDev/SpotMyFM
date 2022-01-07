import { Album } from "data/cacheDB/dexieDB/models/Album";
import { FormEvent, ReactNode, useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useClientsStore } from "store/useClients";
import Buttons from "styles/Buttons";
import cookieManager from "util/cookies/loginCookieManager";
import Styled from "./ModifyAlbumTags.styles";

interface IModifyAlbumTagsProps {
  album: Album;
  closeModal: () => void;
}

function ModifyAlbumTags({
  album,
  closeModal,
}: IModifyAlbumTagsProps): JSX.Element {
  const [albumTags, setAlbumTags] = useState(new Set(album.albumTags));
  const { backendDbApi } = useClientsStore();
  const addTag = useCallback(
    (tag: string) => {
      albumTags.add(tag);
      setAlbumTags(new Set(albumTags));
    },
    [albumTags]
  );

  const updateAlbumTags = useCallback(async () => {
    const tags = Array.from(albumTags.values());

    const [res, err] = await backendDbApi.updateAlbumTags(
      cookieManager.loadJWT() || "",
      [{ id: album.spotifyId, tags: tags }]
    );

    if (!res || err) {
      toast.error(
        "There was an error while updating your tags: " + err?.message
      );
    } else {
      album.albumTags = tags;
      toast.success("Tags successfully updated!");
    }
    closeModal();
  }, [album, albumTags, backendDbApi, closeModal]);

  return (
    <Styled.Card>
      <h3>🏷 Modify Album Tags</h3>
      <Styled.Center>
        <h5>Current Tags:</h5>
        <PillWrap />
        <InputTags
          addTags={addTag}
          tagList={album.allAlbumTags || []}
          selectedTags={albumTags}
        />
        <hr style={{ width: "80%" }} />
        <SuggestedTags
          activeTags={Array.from(albumTags.values())}
          addTag={addTag}
        />
        <hr style={{ width: "80%" }} />
        <Buttons.LayoutCenter>
          <Buttons.SecondaryRedButton
            onClick={() => {
              closeModal();
            }}
          >
            Don't Save and Close
          </Buttons.SecondaryRedButton>
          <Buttons.SecondaryGreenButton onClick={updateAlbumTags}>
            Save Changes
          </Buttons.SecondaryGreenButton>
        </Buttons.LayoutCenter>
      </Styled.Center>
    </Styled.Card>
  );

  function PillWrap(): JSX.Element {
    return (
      <Styled.PillWrap>
        {Array.from(albumTags.values()).map((p) => (
          <Pill
            key={p}
            onClose={() => {
              // Remove from Active Pills:
              albumTags.delete(p);
              setAlbumTags(new Set(albumTags));
            }}
          >
            {p}
          </Pill>
        ))}
      </Styled.PillWrap>
    );
  }
}

interface IPill {
  children: ReactNode | ReactNode[];
  onClose: () => void;
}

function Pill({ onClose, children }: IPill): JSX.Element {
  return <Styled.Pill onClick={onClose}>{children}</Styled.Pill>;
}

interface IInputTags {
  addTags: (s: string) => void;
  tagList: string[];
  selectedTags: Set<string>;
}

function InputTags({
  addTags,
  tagList,
  selectedTags,
}: IInputTags): JSX.Element {
  const [v, setV] = useState("");

  const availableTags = tagList.filter((t) => !selectedTags.has(t));

  return (
    <form>
      <Styled.Center>
        <input
          placeholder="To Listen"
          onChange={handleChange}
          value={v}
          list="albumTags"
        />
        <datalist id={"albumTags"}>
          {availableTags.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </datalist>
        <Buttons.PrimaryGreenButton
          disabled={v.length === 0}
          type="submit"
          onClick={handleSubmit}
        >
          Add {v} Tag
        </Buttons.PrimaryGreenButton>
      </Styled.Center>
    </form>
  );

  function handleChange(e: any) {
    if (!e.nativeEvent.inputType) {
      addTags(e.target.value);

      setV("");
    } else {
      setV(e.target.value);
    }
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    addTags(v);
    setV("");
  }
}

function SuggestedTags({
  activeTags,
  addTag,
}: {
  activeTags: string[];
  addTag: (t: string) => void;
}): JSX.Element {
  const suggested = [
    "To Listen",
    "Listened",
    "Listened " + new Date().getFullYear().toString(),
    new Date().getFullYear().toString(),
    "S Tier",
    "A Tier",
    "B Tier",
    "C Tier",
  ];

  // Remove the already saved Tags:
  const filtered = suggested.filter((s) => activeTags.indexOf(s) === -1);

  return (
    <>
      <h5>Suggested Tags</h5>
      <Buttons.LayoutCenter>
        {filtered.map((t, i) => (
          <Buttons.SecondaryGreenButton key={i} onClick={() => addTag(t)}>
            {t}
          </Buttons.SecondaryGreenButton>
        ))}
      </Buttons.LayoutCenter>
    </>
  );
}

export default ModifyAlbumTags;
