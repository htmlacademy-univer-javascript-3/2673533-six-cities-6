import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import OfferList from '../../components/shared-components/offer-list/offer-list';
import MainMap from '../../components/shared-components/main-map/main-map';
import LocationsList from '../../components/main-screen-components/locations-list/locations-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import SortVariants from '../../components/main-screen-components/sort-variants/sort-variants';
import Header from '../../components/shared-components/header/header';
import { getOffersDataLoadingStatus, getOffersErrorStatus, selectSortedOffersByCity } from '../../store/offers-data/selectors';
import { getActiveCity } from '../../store/main-screen-process/selectors';
import MainEmptyScreen from '../main-empty-screen/main-empty-screen';
import { fetchOffersAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import ErrorScreen from '../error-screen/error-screen';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const [restart, setRestart] = useState(false);
  const activeCity = useAppSelector(getActiveCity);
  const sortedCurrentOffers = useAppSelector(selectSortedOffersByCity);
  const isOffersLoading = useAppSelector(getOffersDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const hasError = useAppSelector(getOffersErrorStatus);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(fetchOffersAction());
      setRestart(false);
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, activeCity, authorizationStatus, restart]);

  if (hasError) {
    return (
      <ErrorScreen restarter={() => setRestart(true)} />
    );
  }

  if (isOffersLoading) {
    return <LoadingScreen />;
  }

  if (sortedCurrentOffers.length === 0) {
    return (
      <MainEmptyScreen activeCity={activeCity} />
    );
  }

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <LocationsList activeCity={activeCity} />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedCurrentOffers.length} places to stay in {activeCity}</b>
              <SortVariants />
              <OfferList offers={sortedCurrentOffers} cardName="cities" listName="cities__places-list" />
            </section>
            <div className="cities__right-section">
              <MainMap cityName={activeCity} className="cities" offers={sortedCurrentOffers} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
