import { Helmet } from 'react-helmet-async';
import OfferList from '../../components/offer-list/offer-list';
import MainMap from '../../components/main-screen-components/main-map/main-map';
import { useState } from 'react';
import LocationsList from '../../components/main-screen-components/locations-list/locations-list';
import { useAppSelector } from '../../hooks';
import { filterOffersByCity } from '../../cities-logic';
import HeaderLogo from '../../components/shared-components/header-logo/header-logo';
import HeaderNav from '../../components/shared-components/header-nav/header-nav';


function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('');
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);

  const currentOffers = filterOffersByCity(offers, activeCity);

  const handleActiveOfferIdChange = (newActiveOfferId: string) => {
    setActiveOfferId(newActiveOfferId);
  };

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{currentOffers.length} places to stay in {activeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <OfferList offers={currentOffers} cardName="cities" listName="cities__places-list" onActiveOfferIdChange={handleActiveOfferIdChange}/>
            </section>
            <div className="cities__right-section">
              <MainMap cityName={activeCity} offers={currentOffers} selectedOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
