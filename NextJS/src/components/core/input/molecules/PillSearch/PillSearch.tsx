import React, { ReactNode, useEffect, useState } from "react";
import Buttons from "styles/Buttons";
import Pill from "../../atoms/Pill";
import Switch from "../../atoms/Switch";
import Styled from "./PillSearch.styles";
import useTranslation from "next-translate/useTranslation";
import Trans from "next-translate/Trans";
interface IPillSearchProps {
  type: "tag" | "genre" | "artist" | "MySpotifyFmTags" | "subgenre" | "mood";
  items: string[];
  title: ReactNode | ReactNode[];
  setFilteredItems: (i: IPillFilter | undefined) => void;
  examplePill?: string;
}

export interface IPillFilter {
  items: Set<string>;
  isAnd: boolean;
}

/**
 * Pill Search Filter component.
 *
 * Given an array of strings (p.items) displays them as a selector and the selected ones
 * are stored with setFilteredItems
 *
 * p.examplePill: An example pill to show
 *
 * p.type: Selects the pill color depending on the type
 *
 * p.title: A title to show.
 *
 * @param param0
 * @returns
 */
function PillSearch({
  type,
  items,
  title,
  setFilteredItems,
  examplePill,
}: IPillSearchProps): JSX.Element {
  // Current selected items:
  const [pills, setPills] = useState<Set<string>>(new Set());
  // Items that can be selected:
  const [availableItems, setAvailableItems] = useState<Set<string>>(new Set());

  // State that manages the switch logic
  const [includeAll, setIncludeAll] = useState(false);

  // State that manages the example logic
  const [showExample, setShowExample] = useState(!!examplePill);

  // Current typed value in the filter search box
  const [typedValue, setTypedValue] = useState("");

  // An array that stores the current pills that contain the search string.
  const [matchInputPills, setMatchInputPills] = useState<string[]>([]);

  // On item load: add them to the available items
  useEffect(() => {
    setAvailableItems(new Set(items));
  }, [items]);

  // On item select: Return by reference the active pills
  useEffect(() => {
    if (pills.size === 0) {
      setFilteredItems(undefined);
    } else {
      setFilteredItems({ items: pills, isAnd: includeAll });
    }
  }, [pills, includeAll, setFilteredItems]);

  // On input change: Filter the typed strings
  useEffect(() => {
    setMatchInputPills(
      Array.from(availableItems.values()).filter((x) =>
        x.toLowerCase().includes(typedValue.toLowerCase())
      )
    );
  }, [availableItems, typedValue]);
  const { t } = useTranslation();
  return (
    <Styled.Card>
      {title}
      <Styled.Center>
        <Styled.PillWrap>
          {showExample ? (
            <Pill onClose={() => setShowExample(false)} type={type}>
              {examplePill}
            </Pill>
          ) : (
            // Show the selected Pill
            Array.from(pills.values()).map((p) => (
              <Pill
                key={p}
                type={type}
                onClose={() => {
                  // Remove from Active Pills:
                  pills.delete(p);
                  setPills(new Set(pills));

                  // Make the item available again:
                  setAvailableItems(new Set(availableItems.add(p)));
                }}
              >
                {p}
              </Pill>
            ))
          )}
        </Styled.PillWrap>
        {items.length > 0 ? (
          <Styled.Input
            // Search Box
            list={type}
            name="pills"
            type="text"
            placeholder={t("cards:select_an_item")}
            onChange={handleChange}
          />
        ) : (
          "No items available"
        )}

        <datalist id={type}>
          {Array.from(availableItems.values()).map((i) => (
            <option value={i} key={i} />
          ))}
        </datalist>

        <Switch
          isChecked={includeAll}
          onToggle={() => setIncludeAll((p) => !p)}
        >
          <p>
            <Trans
              i18nKey="cards:must_include_all_of_the_items"
              components={{
                b: <b />,
              }}
            />
          </p>
        </Switch>

        <Styled.Row>
          <Buttons.PrimaryGreenButton
            disabled={typedValue.length == 0}
            onClick={addAllPills}
          >
            <span>
              {typedValue.length == 0
                ? "Add All Selected"
                : `Add ${matchInputPills.length} "${typedValue}"`}
            </span>
          </Buttons.PrimaryGreenButton>
          <Buttons.PrimaryGreenButton
            disabled={pills.size == 0}
            onClick={reset}
          >
            <span>{t("cards:reset_to_default")}</span>{" "}
          </Buttons.PrimaryGreenButton>
        </Styled.Row>
      </Styled.Center>
    </Styled.Card>
  );

  function handleChange(e: any) {
    const v = e.target.value;
    // On select:
    if (!e.nativeEvent.inputType) {
      addPill(v);
      // Set the typed query back:
      e.target.value = typedValue;
    } else {
      setTypedValue(v);
    }
  }

  function addPill(pill: string) {
    // If there is an example: Remove it
    if (showExample) {
      setShowExample(false);
    }

    // add the pill to current pills
    setPills(new Set(pills.add(pill)));
    // Remove it from the select list:
    availableItems.delete(pill);
    setAvailableItems(new Set(availableItems));
  }

  function addAllPills() {
    matchInputPills.forEach((p) => addPill(p));
  }

  function reset() {
    setPills(new Set());
    setAvailableItems(new Set(items));
    setShowExample(false);
  }
}

export default PillSearch;
