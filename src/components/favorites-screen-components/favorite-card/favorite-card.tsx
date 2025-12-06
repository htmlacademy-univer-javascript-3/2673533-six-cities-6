import { OfferDTO } from '../../../types/offer';
import BookmarkButton from '../../shared-components/bookmark-button/bookmark-button';
import FavoriteOfferImage from '../favorite-offer-image/favorite-offer-image';
import OfferName from '../../shared-components/offer-name/offer-name';
import OfferType from '../../shared-components/offer-type/offer-type';
import PremiumMark from '../../shared-components/premium-mark/premium-mark';
import Price from '../../shared-components/price/price';
import Rating from '../../shared-components/rating/rating';

type FavoriteCardProps = {
  offer: OfferDTO;
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
        <Rating className="place-card" ratingValue={rating} />
        <OfferName offerName={title} offerId={id} />
        <OfferType value={type} />
      </div>
    </article>
  );
}

export default FavoriteCard;
