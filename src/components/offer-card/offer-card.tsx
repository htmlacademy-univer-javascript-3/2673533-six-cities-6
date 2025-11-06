import { Offer } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import OfferImage from '../offer-image/offer-image';
import OfferName from '../offer-name/offer-name';
import OfferType from '../offer-type/offer-type';
import PremiumMark from '../premium-mark/premium-mark';
import Price from '../price/price';
import Rating from '../rating/rating';

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
      <OfferImage src={imageSrc} />
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <Price priceValue={price} />
          <BookmarkButton isInBookmarks={isInBookmarks} />
        </div>
        <Rating ratingValue={rating} />
        <OfferName offerName={name} offerId={id} />
        <OfferType value={type} />
      </div>
    </article>
  );
}

export default OfferCard;
