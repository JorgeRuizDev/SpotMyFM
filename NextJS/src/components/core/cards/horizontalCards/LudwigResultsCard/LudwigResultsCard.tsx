import { IMirResult } from "interfaces/ludwig";
import { useMemo } from "react";
import { toast } from "react-toastify";
import Styled from "./LudwigResultsCard.styles";

import { NewtonsCradle } from "@uiball/loaders";
import { useThemeStore } from "store/useTheme";
import { Theme } from "enums/Theme";

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
  const translate = useMemo(
    () => ({ "metal-sub": "Metal", "rock-sub": "Rock" }),
    []
  );
  const theme = useThemeStore((s) => s.currentTheme);
  return (
    <Styled.HorizontalCard>
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
                      label={g.label}
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
                    label={g.label}
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
                      label={g.label}
                      confidence={g.confidence}
                      key={i}
                    />
                  ))}
              </Styled.Col>
            )}
          </>
        )}
      </Styled.ThreeCols>
    </Styled.HorizontalCard>
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
