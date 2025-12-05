import { OfferMainScreen } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import FavoriteOfferImage from '../favorite-offer-image/favorite-offer-image';
import OfferName from '../offer-name/offer-name';
import OfferType from '../offer-type/offer-type';
import PremiumMark from '../premium-mark/premium-mark';
import Price from '../price/price';
import Rating from '../rating/rating';

type FavoriteCardProps = {
  offer: OfferMainScreen;
}

function FavoriteCard({ offer }: FavoriteCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, isFavorite, rating, title, type } = offer;
  return (
    <article className="favorites__card place-card">
      {isPremium && (<PremiumMark className='place-card__mark'/>)}
      <FavoriteOfferImage src={previewImage} />
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <Price priceValue={price} />
          <BookmarkButton isInBookmarks={isFavorite} className='place-card' width="18" height="19" />
        </div>
        <Rating ratingValue={rating} />
        <OfferName offerName={title} offerId={id} />
        <OfferType value={type} />
      </div>
    </article>
  );
}

export default FavoriteCard;
