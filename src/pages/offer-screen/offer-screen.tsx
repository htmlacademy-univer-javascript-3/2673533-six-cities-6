import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/offer-screen-components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import OfferGallery from '../../components/offer-screen-components/offer-gallery/offer-gallery';
import PremiumMark from '../../components/shared-components/premium-mark/premium-mark';
import BookmarkButton from '../../components/shared-components/bookmark-button/bookmark-button';
import OfferInsideList from '../../components/offer-screen-components/offer-inside-list/offer-inside-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferByIdAction, fetchOffersNearbyAction, fetchCommentsAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect, useState } from 'react';
import ReviewList from '../../components/offer-screen-components/review-list/review-list';
import OfferHost from '../../components/offer-screen-components/offer-host/offer-host';
import OfferPrice from '../../components/offer-screen-components/offer-price/offer-price';
import OfferFeatures from '../../components/offer-screen-components/offer-features/offer-features';
import Rating from '../../components/shared-components/rating/rating';
import OfferList from '../../components/shared-components/offer-list/offer-list';
import MainMap from '../../components/main-screen-components/main-map/main-map';
import { OfferDTO } from '../../types/offer';
import { AuthorizationStatus } from '../../const';
import Header from '../../components/shared-components/header/header';
import { getOfferById, getOfferByIdDataLoadingStatus, getOfferByIdErrorStatus } from '../../store/offer-by-id-data/selectors';
import { getComments, getCommentsDataLoadingStatus, getCommentsErrorStatus } from '../../store/comments-data/selectors';
import { getOffersNearby, getOffersNearbyDataLoadingStatus, getOffersNearbyErrorStatus } from '../../store/offers-nearby-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { clearOfferById } from '../../store/offer-by-id-data/offer-by-id-data';
import { clearComments } from '../../store/comments-data/comments-data';
import { clearOffersNearby } from '../../store/offers-nearby-data/offers-nearby-data';
import ErrorScreen from '../error-screen/error-screen';

function OfferScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [restart, setRestart] = useState(false);
  const isCurrentOfferLoading = useAppSelector(getOfferByIdDataLoadingStatus);
  const isCurrentReviewsDataLoading = useAppSelector(getCommentsDataLoadingStatus);
  const isOffersNearbyDataLoading = useAppSelector(getOffersNearbyDataLoadingStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const currentOfferFull = useAppSelector(getOfferById);
  const reviews = useAppSelector(getComments);
  const offersNearby = useAppSelector(getOffersNearby).slice(0, 3);
  const offerByIdHasError = useAppSelector(getOfferByIdErrorStatus);
  const commentsHasError = useAppSelector(getCommentsErrorStatus);
  const offersNearbyHasError = useAppSelector(getOffersNearbyErrorStatus);
  const offerId = params.id;

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferByIdAction(offerId));
      dispatch(fetchCommentsAction(offerId));
      dispatch(fetchOffersNearbyAction(offerId));
    } else {
      dispatch(clearOfferById());
      dispatch(clearComments());
      dispatch(clearOffersNearby());
    }
    setRestart(false);
  }, [offerId, dispatch, restart]);

  if (offerByIdHasError || commentsHasError || offersNearbyHasError) {
    return <ErrorScreen restarter={() => setRestart(true)}/>
  }

  if (isCurrentOfferLoading || isCurrentReviewsDataLoading || isOffersNearbyDataLoading) {
    return <LoadingScreen />;
  }

  if (!currentOfferFull) {
    return <NotFoundScreen />;
  }

  const { id, isPremium, price, isFavorite, rating, title, type, images, goods, bedrooms, maxAdults, host, description } = currentOfferFull;

  const currentOffer: OfferDTO = {
    id: id,
    title: title,
    type: type,
    price: price,
    city: currentOfferFull.city,
    location: currentOfferFull.location,
    isFavorite: isFavorite,
    isPremium: isPremium,
    rating: rating,
    previewImage: ''
  };

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. {title}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (<PremiumMark className='offer__mark' />)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <BookmarkButton offerId={id} isFavorite={isFavorite} className='offer' width="31" height="33" />
              </div>
              <Rating className="offer" ratingValue={rating}>
                <span className="offer__rating-value rating__value">{rating}</span>
              </Rating>
              <OfferFeatures type={type} bedrooms={bedrooms} maxAdults={maxAdults} />
              <OfferPrice price={price} />
              <OfferInsideList items={goods} />
              <OfferHost host={host} description={description} />
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewList reviews={reviews} />
                {authorizationStatus === AuthorizationStatus.Auth && <ReviewForm offerId={id} />}
              </section>
            </div>
          </div>
          <MainMap cityName={currentOffer.city.name} offers={offersNearby.concat(currentOffer)} selectedOfferId={id} className="offer" />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OfferList listName="near-places__list" offers={offersNearby} cardName="near-places" />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
