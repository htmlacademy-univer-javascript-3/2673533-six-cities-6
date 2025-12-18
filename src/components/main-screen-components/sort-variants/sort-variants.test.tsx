import { render, screen } from '@testing-library/react';
import { withStore } from '../../../utils/mock-component';
import SortVariants from './sort-variants';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: SortVariants', () => {
  it('should render correctly', () => {
    const { withStoreComponent } = withStore(<SortVariants />, makeFakeStore());
    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });
});
