import { Helmet } from 'react-helmet-async';
import OfferList from '../../components/shared-components/offer-list/offer-list';
import MainMap from '../../components/main-screen-components/main-map/main-map';
import { useState } from 'react';
import LocationsList from '../../components/main-screen-components/locations-list/locations-list';
import { useAppSelector } from '../../hooks';
import { filterOffersByCity, sortOffers } from '../../cities-logic';
import HeaderLogo from '../../components/shared-components/header-logo/header-logo';
import HeaderNav from '../../components/shared-components/header-nav/header-nav';
import SortVariants from '../../components/main-screen-components/sort-variants/sort-variants';


function MainScreen(): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState('');
  const activeCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const currentSort = useAppSelector((state) => state.currentSort);

  const currentOffers = filterOffersByCity(offers, activeCity);
  const sortedCurrentOffers = sortOffers(currentOffers, currentSort);
  
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
              <b className="places__found">{sortedCurrentOffers.length} places to stay in {activeCity}</b>
              


              <SortVariants />
              <OfferList offers={sortedCurrentOffers} cardName="cities" listName="cities__places-list" onActiveOfferIdChange={handleActiveOfferIdChange}/>
            </section>
            <div className="cities__right-section">
              <MainMap cityName={activeCity} className="cities" offers={sortedCurrentOffers} selectedOfferId={activeOfferId}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
