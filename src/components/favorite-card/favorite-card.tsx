import { Offer } from "../../types/offer";
import BookmarkButton from "../bookmark-button/bookmark-button";
import FavoriteOfferImage from "../favorite-offer-image/favorite-offer-image";
import OfferName from "../offer-name/offer-name";
import OfferType from "../offer-type/offer-type";
import PremiumMark from "../premium-mark/premium-mark";
import Price from "../price/price";
import Rating from "../rating/rating";

type FavoriteCardProps = {
  offer: Offer
}

function FavoriteCard({ offer }: FavoriteCardProps): JSX.Element {
  const { id, isPremium, imageSrc, price, isInBookmarks, rating, name, type } = offer;
  return (
    <article className="favorites__card place-card">
      {isPremium && (<PremiumMark />)}
      <FavoriteOfferImage src={imageSrc} />
      <div className="favorites__card-info place-card__info">
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

export default FavoriteCard;