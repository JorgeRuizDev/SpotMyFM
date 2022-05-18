import React from "react";
import { FaLastfm, FaSpotify } from "react-icons/fa";
import { AiFillApi } from "react-icons/ai";
import Buttons from "styles/Buttons";
import Styled, { P } from "./LoginPage.styles";
import {getOauth} from "../../../../../util/spotify/oauthFrontend";

interface ILoginPageProps {}

function LoginPage(props: ILoginPageProps) {
  return (
    <Styled.ContentWrapper>
      <Styled.ColCenter>
        <Styled.Title>
          Welcome to <Styled.Green>MySpotifyFM</Styled.Green>!
        </Styled.Title>
        <Styled.Subtitle>A Spotify Library Manager</Styled.Subtitle>
      </Styled.ColCenter>

      <Styled.TopButtonWrap>
        <SpotifyLoginBtn />
      </Styled.TopButtonWrap>

      <Styled.CardWrap>
        <Styled.Card>
          <h1>
            <Styled.Green>
              <FaSpotify />
            </Styled.Green>
          </h1>


          <h4 style={{ textAlign: "center" }}>
            <Styled.Green>Manage your Spotify Library</Styled.Green>
          </h4>
          <hr />
          <br />
          <P>
            Log In with your Spotify Account to{" "}
            <Styled.Green>Explore, Play</Styled.Green> and{" "}
            <Styled.Green>Filter</Styled.Green> your favorite songs!
          </P>
          <br />
          <P>
            <Styled.Green>Create or Replace</Styled.Green> your playlists with
            your personalized track selection!
          </P>
          <br />
          <P>
            <Styled.Green>Tag Your Albums!</Styled.Green> Use custom tags to
            increase your album organization.
          </P>
        </Styled.Card>

        <Styled.Card>
          <h1>
            <Styled.Red>
              <FaLastfm />
            </Styled.Red>
          </h1>
          <h4 style={{ textAlign: "center" }}>
            <Styled.Red>LastFM Community</Styled.Red>
          </h4>
          <hr />
          <br />
          <P>
            MySpotifyFm <Styled.Red>mixes your spotify library</Styled.Red> with
            the awesome <Styled.Red>LastFM Community</Styled.Red>.
          </P>
          <br />
          <P>
            Filter by <Styled.Red>Community Tags</Styled.Red> or get individual
            details for each track!
          </P>
          <hr />

          <P>
            Create and Share your custom{" "}
            <Styled.Red>LastFM profile Collages</Styled.Red>!
          </P>
        </Styled.Card>

        <Styled.Card>
          <h1>
            <Styled.Green>
              <AiFillApi />
            </Styled.Green>
          </h1>
          <hr />
          <h4 style={{ textAlign: "center" }}>
            <Styled.Green>DeepLearning Backend</Styled.Green>
          </h4>
          <br />
          <P>
            <Styled.Green>MySpotifyFm</Styled.Green> uses {" "}
            <Styled.Green>deeplearning</Styled.Green> techniques to analyze your favourite tracks audio signal.

          </P>
          <br />
          <P>
            <Styled.Green>Check your Stats!</Styled.Green> With Ludwig Backend you can explore track features such as Track Mood or Subgenre.
          </P>
          <br />
          <P>
            Extend your <Styled.Green>library</Styled.Green> with similar tracks!
            SpotMyFM provides content base recommendations to extend your playlist / library.
          </P>
        </Styled.Card>
      </Styled.CardWrap>
      <Styled.ButtonWrap>
        <SpotifyLoginBtn />
      </Styled.ButtonWrap>
    </Styled.ContentWrapper>
  );
}

function SpotifyLoginBtn() {
  return (
    <Buttons.LoginButton onClick={getOauth().promptCredentials}>
      Log In With Spotify
    </Buttons.LoginButton>
  );
}

export default LoginPage;
