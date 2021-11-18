import { ReactNode } from "react";
import Styled from "./GenericCardView.styles";
interface IGenericCardViewProps {
  setSorting: (option: string) => void;
  sortingOptions: string[];
  setInputFilter: (s: string) => void;
  pageSize: number;
  children: ReactNode | ReactNode[] | null;
  type?: "card" | "list";
}

function GenericCardView({
  children,
  setSorting,
  sortingOptions,
  setInputFilter,
  pageSize = 50,
  type = "card",
}: IGenericCardViewProps) {
  return <></>;
}

export default GenericCardView;
