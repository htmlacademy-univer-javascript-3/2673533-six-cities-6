import { SortType, SortTypes } from "../../../const";
import SortListItem from "../sort-list-item/sort-list-item";

type SortListProps = {
  currentSortType: SortType;
  onSortClick: (sortType: SortType) => void;
}

function SortList({ currentSortType, onSortClick } : SortListProps): JSX.Element {
  return (
    <ul className="places__options places__options--custom places__options--opened">
      {SortTypes.map((sortType) => (
        <SortListItem isActive={sortType === currentSortType} sortType={sortType} onClick={onSortClick} key={sortType}/>
      ))}
    </ul>
  );
}

export default SortList;
