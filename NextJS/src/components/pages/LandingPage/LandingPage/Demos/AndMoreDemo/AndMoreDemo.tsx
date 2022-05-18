import Styled from "./AndMoreDemo.styles";
interface IAndMoreDemoProps {}

function AndMoreDemo(props: IAndMoreDemoProps) {
  return (
    <Styled.GridWrap>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/demo0.mp4" type="video/mp4" />
        </video>

        <Styled.CenterCol>
          <hr />
          <h4>Create or replace your own playlists!</h4>
        </Styled.CenterCol>
      </div>
      <div>
        <video autoPlay muted loop width="700" height="400">
          <source src="/demo/demoVideos/demo1.mp4" type="video/mp4" />
        </video>
        <Styled.CenterCol>
          <hr />
          <h4>Create Random Playlists with RealShuffle!</h4>
        </Styled.CenterCol>
      </div>
      <div style={{ maxWidth: 700 }}>
        <img src="/demo/Collage.png" alt="Demo Collage Example" />
        <Styled.CenterCol>
          <hr />
          <h4>Share your library as a Collage!</h4>
        </Styled.CenterCol>
      </div>
    </Styled.GridWrap>
  );
}

export default AndMoreDemo;
