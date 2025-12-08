import { Helmet } from 'react-helmet-async';
import { AppRoute, CITIES } from '../../const';
import FavoritesListByCity from '../../components/favorites-screen-components/favorites-list-by-city/favorites-list-by-city';
import { Link } from 'react-router-dom';
import Header from '../../components/shared-components/header/header';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesDataLoadingStatus } from '../../store/favorites-data/selectors';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector(getFavorites);
  const isFavoritesLoading = useAppSelector(getFavoritesDataLoadingStatus);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (isFavoritesLoading) {
    return <LoadingScreen />;
  }

  if (favoriteOffers.length === 0) {
    return (
      <FavoritesEmptyScreen />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {CITIES.map((city) => (
                <FavoritesListByCity
                  key={city.name}
                  cityName={city.name}
                  offers={favoriteOffers}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
