import Styled from "./MultipleSkeletonList.styles";
interface IMultipleSkeletonListProps {
  times?: number;
}
import SkeletonList from "../SkeletonList/";
function MultipleSkeletonList({ times = 20 }: IMultipleSkeletonListProps) {
  return (
    <>
      {Array.from({ length: times }, (_, i) => (
        <SkeletonList key={i} />
      ))}
    </>
  );
}

export default MultipleSkeletonList;
