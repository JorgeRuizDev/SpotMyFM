import Styled from "./SearchPage.styles";
import Buttons from "styles/Buttons";

import Text from "styles/Text";
import Switch from "components/core/input/atoms/Switch";
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import SimpleSlider from "components/core/input/atoms/Sliders/SimpleSlider";
import { FaSearch } from "react-icons/fa";
interface ISearchPageProps {}

function SearchPage(props: ISearchPageProps): JSX.Element {
  const [searchArtists, setSearchArtists] = useState(true);
  const [searchTracks, setSearchTracks] = useState(true);
  const [searchAlbums, setSearchAlbums] = useState(true);
  const [maxRes, setMaxRes] = useState(15);
  const [searchStr, setSearchStr] = useState("");

  const validStr = useMemo(() => searchStr.length >= 3, [searchStr]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if (v.length >= 3) {
      setSearchStr(v);
    } else {
      setSearchStr("");
    }
  }, []);

  const search = useCallback(() => {
    if (validStr) {
      console.log("hehe");
    }
  }, [validStr]);

  return (
    <Styled.Col>
      <Text.Center>
        <h1>
          <Text.Inline>
            <Text.green>
              <FaSearch />
            </Text.green>
            <span>{" "}Spotify Search</span>
          </Text.Inline>{" "}
        </h1>
      </Text.Center>
      <Styled.Center>
        <Styled.CardWrap>
          <Styled.Card>
            <Text.Center>
              <h4>Settings</h4>
            </Text.Center>
            <Switch
              isChecked={searchTracks}
              onToggle={() => {
                setSearchTracks((p) => !p);
              }}
            >
              <p>Search Tracks</p>
            </Switch>
            <Switch
              isChecked={searchAlbums}
              onToggle={() => {
                setSearchAlbums((p) => !p);
              }}
            >
              <p>Search Albums</p>
            </Switch>
            <Switch
              isChecked={searchArtists}
              onToggle={() => {
                setSearchArtists((p) => !p);
              }}
            >
              <p>Search Artists</p>
            </Switch>

            <hr />
            <p>Show {maxRes} results per category</p>
            <SimpleSlider
              max={50}
              min={10}
              defaultValue={15}
              onAfterChange={(c) => setMaxRes(c)}
            />
          </Styled.Card>

          <Styled.Form>
            <Text.Center>
              <Text.Inline>
                <input
                  placeholder="David Bowie Heroes"
                  onChange={handleChange}
                  onSubmit={search}
                  minLength={3}
                />
                <Buttons.PrimaryGreenButton
                  disabled={!validStr}
                  type="submit"
                  rounded
                  onClick={(e) => {
                    e.preventDefault();
                    search();
                  }}
                >
                  <FaSearch />
                </Buttons.PrimaryGreenButton>
              </Text.Inline>
            </Text.Center>
          </Styled.Form>
        </Styled.CardWrap>
      </Styled.Center>
    </Styled.Col>
  );
}

export default SearchPage;
