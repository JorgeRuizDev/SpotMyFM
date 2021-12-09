import { IPillFilter } from "components/core/input/molecules/PillSearch/PillSearch";

export function filterByPill(
  trackItems: string[] | undefined,
  filter: IPillFilter
) {
  if (trackItems == undefined) {
    return false;
  }

  if (filter.isAnd) {
    return Array.from(filter.items.values()).every((v) =>
      trackItems.includes(v)
    );
  } else {
    return trackItems.some((t) =>
      Array.from(filter.items.values()).includes(t)
    );
  }
}
