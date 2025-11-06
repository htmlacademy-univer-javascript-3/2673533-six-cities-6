import { Helmet } from 'react-helmet-async';
import HeaderLogo from '../../components/header-logo/header-logo';
import HeaderNav from '../../components/header-nav/header-nav';
import { Offers } from '../../types/offer';
import { CITIES } from '../../const';
import FavoritesListByCity from '../../components/favorites-list-by-city/favorites-list-by-city';

type FavoritesScreenProps = {
  favoriteOffers: Offers;
}

function FavoritesScreen({ favoriteOffers }: FavoritesScreenProps): JSX.Element {
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
              {CITIES.map(city => (
                <FavoritesListByCity
                  key={city}
                  city={city}
                  offers={favoriteOffers}
                />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
