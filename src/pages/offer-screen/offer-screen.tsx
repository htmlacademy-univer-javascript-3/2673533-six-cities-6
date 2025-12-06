import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import ReviewForm from '../../components/offer-screen-components/review-form/review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import OfferGallery from '../../components/offer-screen-components/offer-gallery/offer-gallery';
import PremiumMark from '../../components/shared-components/premium-mark/premium-mark';
import BookmarkButton from '../../components/shared-components/bookmark-button/bookmark-button';
import OfferInsideList from '../../components/offer-screen-components/offer-inside-list/offer-inside-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferFullByIdAction, fetchReviewsAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import { clearCurrentOffer, clearCurrentReviews } from '../../store/action';
import HeaderLogo from '../../components/shared-components/header-logo/header-logo';
import HeaderNav from '../../components/shared-components/header-nav/header-nav';
import ReviewList from '../../components/offer-screen-components/review-list/review-list';
import OfferHost from '../../components/offer-screen-components/offer-host/offer-host';
import OfferPrice from '../../components/offer-screen-components/offer-price/offer-price';
import OfferFeatures from '../../components/offer-screen-components/offer-features/offer-features';
import Rating from '../../components/shared-components/rating/rating';

function OfferScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isCurrentOfferLoading = useAppSelector((state) => state.isCurrentOfferLoading);
  const isCurrentReviewsDataLoading = useAppSelector((state) => state.isCurrentReviewsDataLoading);
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const reviews = useAppSelector((state) => state.currentReviews);

  useEffect(() => {
    const offerId = params.id;
    if (offerId) {
      dispatch(fetchOfferFullByIdAction(offerId));
      dispatch(fetchReviewsAction(offerId));
    } else {
      dispatch(clearCurrentOffer());
      dispatch(clearCurrentReviews());
    }
  }, [params.id, dispatch]);

  if (isCurrentOfferLoading || isCurrentReviewsDataLoading) {
    return <LoadingScreen />;
  }

  if (!currentOffer) {
    return <NotFoundScreen />;
  }

  const { isPremium, price, isFavorite, rating, title, type, images, goods, bedrooms, maxAdults, host, description } = currentOffer;

  return (
    <div className="page">
      <Helmet>
        <title>6 cities. {title}</title>
      </Helmet>

      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLogo />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={images} />
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium && (<PremiumMark className='offer__mark' />)}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>
                <BookmarkButton isInBookmarks={isFavorite} className='offer' width="31" height="33" />
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
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="offer__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/room.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;80</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                      <svg className="place-card__bookmark-icon" width="18" height="19">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Room</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-02.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;132</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                      <svg className="place-card__bookmark-icon" width="18" height="19">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-03.jpg" width="260" height="200" alt="Place image" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;180</b>
                      <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                      <svg className="place-card__bookmark-icon" width="18" height="19">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '100%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
