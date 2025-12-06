import { Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offers;
  listName: string;
  cardName: string;
  onActiveOfferIdChange?: (newActiveOfferId: string) => void;
}

function OfferList({ offers, cardName, listName, onActiveOfferIdChange }: OfferListProps): JSX.Element {
  const handleMouseEnter = onActiveOfferIdChange ? (offerCardId: string) => {
    onActiveOfferIdChange(offerCardId);
  } : undefined;

  const handleMouseLeave = onActiveOfferIdChange ? () => {
    onActiveOfferIdChange('');
  } : undefined;

  return (
    <div className={`${listName} places__list ${cardName === "cities" ? "tabs__content" : ""}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardName={cardName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
