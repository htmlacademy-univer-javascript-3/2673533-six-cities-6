import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppRoute, CITIES } from '../../const';
import FavoritesListByCity from '../../components/favorites-screen-components/favorites-list-by-city/favorites-list-by-city';
import Header from '../../components/shared-components/header/header';
import FavoritesEmptyScreen from '../favorites-empty-screen/favorites-empty-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFavorites, getFavoritesDataLoadingStatus, getFavoritesErrorStatus } from '../../store/favorites-data/selectors';
import { fetchFavoritesAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from '../error-screen/error-screen';

function FavoritesScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [restart, setRestart] = useState(false);
  const favoriteOffers = useAppSelector(getFavorites);
  const isFavoritesLoading = useAppSelector(getFavoritesDataLoadingStatus);
  const hasError = useAppSelector(getFavoritesErrorStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchFavoritesAction());
      setRestart(false);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, restart]);

  if (hasError) {
    return (
      <ErrorScreen restarter={() => setRestart(true)} />
    );
  }

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
