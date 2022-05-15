import { IMirResult } from "interfaces/ludwig";
import { useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import Styled from "./LudwigResultsCard.styles";

import { useThemeStore } from "store/useTheme";
import { Theme } from "enums/Theme";
import NewtonsCradle from "components/core/display/atoms/NewtonsCradle";

interface ILudwigResultsCardProps {
  isLoading: boolean;
  genres?: IMirResult[];
  subgenres?: IMirResult[];
  moods?: IMirResult[];
}

function LudwigResultsCard({
  isLoading = true,
  genres = [],
  moods = [],
  subgenres = [],
}: ILudwigResultsCardProps): JSX.Element {
  const translate = useCallback((label: string): string => {
    if (label.indexOf("---") > -1) {
      return label.split("---")[1] || label;
    }

    const translate: { [key: string]: string } = {
      "metal-sub": "Metal",
      "rock-sub": "Rock",
      "punk-sub": "Punk",
      happy: "Happy 😁",
      sad: "Sad 😔",
      electronic: "Electronic ⚡",
      acoustic: "Acoustic 🎸",
      party: "Party 🎉",
      relaxed: "Relaxed 😌",
      aggressive: "Aggressive 🔫",
    };

    return translate[label] || label;
  }, []);
  const theme = useThemeStore((s) => s.currentTheme);
  return (
    <Styled.Wrapper>
      <Styled.Title>🧪 Track Signal Analysis</Styled.Title>
      <Styled.ThreeCols>
        {isLoading ? (
          <NewtonsCradle
            size={40}
            speed={1.4}
            color={theme === Theme.DARK ? "white" : "black"}
          />
        ) : (
          <>
            {genres.length > 0 && (
              <Styled.Col>
                <Styled.Subtitle>Genres</Styled.Subtitle>
                {genres.map((g, i) => (
                  <>
                    <ConfidencePill
                      label={translate(g.label)}
                      confidence={g.confidence}
                      key={i}
                    />
                  </>
                ))}
              </Styled.Col>
            )}

            {subgenres.length > 0 && (
              <Styled.Col>
                <Styled.Subtitle>Subgenres</Styled.Subtitle>
                {subgenres.map((g, i) => (
                  <ConfidencePill
                    label={translate(g.label)}
                    confidence={g.confidence}
                    key={i}
                  />
                ))}
              </Styled.Col>
            )}

            {moods.length > 0 && (
              <Styled.Col>
                <Styled.Subtitle>Moods</Styled.Subtitle>
                {moods
                  .filter((m) => m.confidence > 0.5)
                  .map((g, i) => (
                    <ConfidencePill
                      label={translate(g.label)}
                      confidence={g.confidence}
                      key={i}
                    />
                  ))}
              </Styled.Col>
            )}
          </>
        )}
      </Styled.ThreeCols>
    </Styled.Wrapper>
  );
}

function ConfidencePill({
  label,
  confidence,
}: {
  label: string;
  confidence: number;
}): JSX.Element {
  const confidenceType = useMemo(
    () => (confidence < 0.333 ? "low" : confidence < 0.666 ? "medium" : "high"),
    [confidence]
  );
  return (
    <>
      <Styled.Pill
        confidence={confidenceType}
        onClick={() =>
          toast.info(
            `${label} has ${(confidence * 100).toFixed(2)}% of confidence`
          )
        }
      >
        {label}
      </Styled.Pill>
    </>
  );
}

export default LudwigResultsCard;
