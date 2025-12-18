import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import SortList from './sort-list';
import { SortType, SortTypes } from '../../../const';

vi.mock('../sort-list-item/sort-list-item', () => ({
  default: function MockSortListItem({isActive, sortType, onClick}: {
    isActive: boolean; 
    sortType: SortType; 
    onClick: (sortType: SortType) => void;
  }): JSX.Element {
    return (
      <li 
        data-testid={`mock-sort-item-${sortType}`}
        data-active={isActive}
        onClick={() => onClick(sortType)}
        className={isActive ? 'active' : ''}
      >
        {sortType} {isActive ? '(active)' : ''}
      </li>
    );
  }
}));

describe('Component: SortList', () => {
  it('should render correctly', () => {
    const currentSortType = SortType.Popular;
    
    render(<SortList currentSortType={currentSortType} onSortClick={vi.fn()} />);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(SortTypes.length);

    SortTypes.forEach((sortType) => {
      const listItem = screen.getByTestId(`mock-sort-item-${sortType}`);
      expect(listItem).toBeInTheDocument();
      expect(listItem).toHaveTextContent(sortType);
    });
  });
});