import { HTMLAttributes, memo } from 'react';
import { OfferDTO } from '../../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import OfferImage from '../offer-image/offer-image';
import OfferName from '../offer-name/offer-name';
import OfferType from '../offer-type/offer-type';
import PremiumMark from '../premium-mark/premium-mark';
import Price from '../price/price';
import Rating from '../rating/rating';
import { useAppDispatch } from '../../../hooks';
import { setActiveOfferId } from '../../../store/main-screen-process/main-screen-process';

type OfferCardProps = {
  offer: OfferDTO;
  cardName: string;
}

function OfferCard({ offer, cardName }: OfferCardProps): JSX.Element {
  const { id, isPremium, previewImage, price, isFavorite, rating, title, type } = offer;
  const dispatch = useAppDispatch();
  const props: HTMLAttributes<HTMLElement> = {
    className: `${cardName}__card place-card`,
  };

  const handleOnMouseEnter = (offerCardId: string) => {
    dispatch(setActiveOfferId(offerCardId));
  }

  const handleOnMouseLeave = () => {
    dispatch(setActiveOfferId(''));
  }

  if (cardName === 'cities') {
    props.onMouseEnter = () => handleOnMouseEnter(id);
    props.onMouseLeave = handleOnMouseLeave;
  }

  return (
    <article {...props}>
      {isPremium && (<PremiumMark className='place-card__mark' />)}
      <OfferImage src={previewImage} cardName={cardName} />
      <div className="place-card__info">
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

export default memo(OfferCard);
