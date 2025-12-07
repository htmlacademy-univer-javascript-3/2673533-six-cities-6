import { SortType } from "../../../const";

type SortListItemProps = {
  isActive: boolean;
  sortType: SortType;
  onClick: (sortType: SortType) => void;
}

function SortListItem({ isActive, sortType, onClick } : SortListItemProps): JSX.Element {
  const className = `places__option ${isActive ? "places__option--active" : ""}`;
  return (
    <li className={className} tabIndex={0} onClick={() => onClick(sortType)}>{sortType}</li>
  );
}

export default SortListItem;
