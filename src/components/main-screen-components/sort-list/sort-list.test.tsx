import { render, screen } from '@testing-library/react';
import SortList from './sort-list';
import { SortType } from '../../../const';

vi.mock('../sort-list-item/sort-list-item', () => ({
  default: function MockSortListItem(): JSX.Element {
    return <div data-testid='mock-sort-item'>SortItem</div>;
  }
}));

describe('Component: SortList', () => {
  it('should render correctly', () => {
    render(<SortList currentSortType={SortType.Popular} onSortClick={vi.fn()} />);

    const sorts = screen.getAllByTestId('mock-sort-item');
    expect(sorts.length).toEqual(4);
    sorts.forEach((sortType) => {
      expect(sortType).toBeInTheDocument();
    });
  });
});
