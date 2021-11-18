import { ReactNode } from "react";
import Styled from "./genericCardView.styles";
interface IgenericCardViewProps {
  setSorting: (option: string) => void;
  sortingOptions: string[];
  setInputFilter: (s: string) => void;
  pageSize: number;
  children: ReactNode | ReactNode[] | null;
  type?: "card" | "list";
}

function genericCardView({
  children,
  setSorting,
  sortingOptions,
  setInputFilter,
  pageSize = 50,
  type = "card",
}: IgenericCardViewProps): JSX.Element {
  return <></>;
}

export default genericCardView;
