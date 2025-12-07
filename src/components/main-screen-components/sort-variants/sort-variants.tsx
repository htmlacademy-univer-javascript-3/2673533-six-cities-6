import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { SortType } from '../../../const';
import { setCurrentSortType } from '../../../store/action';
import SortList from '../sort-list/sort-list';

function SortVariants(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector((state) => state.currentSort);

  const handleSortClick = (sortType: SortType) => {
    dispatch(setCurrentSortType(sortType));
    setIsOpen(false);
  };

  const handleSortTypeClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleSortTypeClick}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && <SortList currentSortType={currentSort} onSortClick={handleSortClick} />}
    </form>
  );
}

export default SortVariants;
