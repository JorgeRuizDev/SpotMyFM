import Head from "components/util/Head";
import LudwigDropZone from "../../../core/input/atoms/LudwigDropZone";
import React from "react";
import {toast} from "react-toastify";

import Styled from "./LandingPage.styles";
import {Theme} from "enums/Theme";
import {getOauth} from "../../../../util/spotify/oauthFrontend";
import {useThemeStore} from "../../../../store/useTheme";
import FullPage from "./FullPage";
import AndMoreDemo from "./Demos/AndMoreDemo";
import LoginPage from "./LoginPage";
import FilterDemo from "./Demos/FilterDemo";

export default function (): JSX.Element {
    const theme = useThemeStore((s) => s.currentTheme);
    return (
        <div>
            <Head/>

            <FullPage
                styles={generateBackgrounds(6, theme == Theme.DARK)}
                topButton={"Try Now! 👋"}
            >
                <Styled.CenterCol>
                    <DivTop/>
                    <LoginPage/>
                </Styled.CenterCol>

                <Styled.DemoWrapper>
                    <Styled.CenterCol>
                        <h3>Explore Your Library!</h3>
                        <p>Click anywhere in order to enable hover preview!</p>
                        <hr/>
                    </Styled.CenterCol>
                </Styled.DemoWrapper>
                <Styled.DemoWrapper>
                    <Styled.CenterCol>
                        <h3>Analyze Your Tracks!</h3>
                        <p>Upload an .mp3 / .wav file</p>
                        <hr/>
                        <LudwigDropZone/>
                    </Styled.CenterCol>
                </Styled.DemoWrapper>

                <Styled.DemoWrapper>
                    <Styled.CenterCol>
                        <h3>Explore and Tag your Albums!</h3>
                        <hr/>
                    </Styled.CenterCol>
                </Styled.DemoWrapper>
                <Styled.DemoWrapper>
                    <Styled.CenterCol>
                        <h3>Use Advanced Filters!</h3>
                        <h5>Create Specific Playlists</h5>
                        <hr/>
                        <FilterDemo/>
                    </Styled.CenterCol>
                    <Styled.CenterCol>
                        <h1>. . .</h1>
                        <h5>And many more</h5>
                    </Styled.CenterCol>
                </Styled.DemoWrapper>
                <div>
                    <Styled.DemoWrapper>
                        <Styled.CenterCol>
                            <h3>And Many More!</h3>
                            <hr/>
                        </Styled.CenterCol>
                        <AndMoreDemo/>
                    </Styled.DemoWrapper>
                    <DivBottom/>
                </div>
            </FullPage>
        </div>
    );
}

function generateBackgrounds(count: number, isDark: boolean) {
    function darkPalette() {
        const p: string[] = [];
        for (let i = 0; i < count; i++) {
            p.push(`hsl(0, 0%, ${13 + 4 * i}%)`);
        }

        return p;
    }

    function lightPalette() {
        const p: string[] = [];
        for (let i = 0; i < count; i++) {
            p.push(`hsl(220, 13%, ${91 - 2 * i}%)`);
        }

        return p;
    }

    const styles: React.CSSProperties[] = [];

    for (const bg of isDark ? darkPalette() : lightPalette()) {
        styles.push({background: bg});
    }

    return styles;
}

function DivTop() {
    return (
        <div
            className="custom-shape-divider-top-1630680612"
            style={{position: "absolute", top: 0}}
        >
            <svg
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    className="shape-fill"
                ></path>
            </svg>
        </div>
    );
}

function DivBottom() {
    return (
        <div
            style={{
                width: "100vw",
            }}
        >
            <div className="custom-shape-divider-bottom-1630680696">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0V6c0,21.6,291,111.46,741,110.26,445.39,3.6,459-88.3,459-110.26V0Z"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </div>
    );
}

export function toastLogIn(message: string) {
    toast.info(
        <span onClick={() => getOauth().promptCredentials()}>{message}</span>
    );
}
