import { render, screen } from '@testing-library/react';
import SortListItem from './sort-list-item';
import { SortType } from '../../../const';

describe('Component: SortListItem', () => {
  it('should render correctly', () => {
    const expectedSortType = SortType.PriceLowToHigh;
    render(<SortListItem isActive sortType={expectedSortType} onClick={vi.fn()} />);

    expect(screen.getByText(expectedSortType)).toBeInTheDocument();
  });
});
