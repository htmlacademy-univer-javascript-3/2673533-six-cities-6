import { render, screen } from '@testing-library/react';
import BookmarkButton from './bookmark-button';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore } from '../../../utils/mocks';

describe('Component: BookmarkButton', () => {
  it('should render correctly when favorite is true', () => {
    const {withStoreComponent} = withStore(<BookmarkButton offerId='' isFavorite className='place-card' width='18' height='19'/>, makeFakeStore());
    render(withHistory(withStoreComponent));

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
    expect(screen.queryByText('To bookmarks')).not.toBeInTheDocument();
  });

  it('should render correctly when favorite is false', () => {
    const {withStoreComponent} = withStore(<BookmarkButton offerId='' isFavorite={false} className='place-card' width='18' height='19'/>, makeFakeStore());
    render(withHistory(withStoreComponent));

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.queryByText('In bookmarks')).not.toBeInTheDocument();
  });
});
