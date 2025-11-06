import { Offer } from '../../types/offer';
import PremiumMark from '../premium-mark/premium-mark';

type OfferCardProps = {
  offer: Offer;
  onMouseEnter: (offerCardId: number) => void;
  onMouseLeave: () => void;
}


function OfferCard({ offer, onMouseEnter, onMouseLeave }: OfferCardProps): JSX.Element {
  const { id, isPremium, imageSrc, price, isInBookmarks, rating, name, type } = offer;
  return (
    <article 
      className="cities__card place-card" 
      onMouseEnter={ () => onMouseEnter(id) }
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (<PremiumMark />)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={imageSrc} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${isInBookmarks ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{isInBookmarks ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{name}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
