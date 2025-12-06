import { Helmet } from 'react-helmet-async';
import HeaderLogo from '../../components/header-logo/header-logo';
import HeaderNav from '../../components/header-nav/header-nav';
import { AppRoute, CITIES } from '../../const';
import FavoritesListByCity from '../../components/favorites-list-by-city/favorites-list-by-city';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { filterOffersByFavorite } from '../../cities-logic';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const favoriteOffers = filterOffersByFavorite(offers);
  return (
    <div className="page">
      <Helmet>
        <title>6 cities. Favorites</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

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
