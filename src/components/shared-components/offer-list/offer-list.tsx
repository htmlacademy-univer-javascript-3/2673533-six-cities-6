import { Offers } from '../../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offers;
  listName: string;
  cardName: string;
}

function OfferList({ offers, cardName, listName }: OfferListProps): JSX.Element {
  return (
    <div className={`${listName} places__list ${cardName === 'cities' ? 'tabs__content' : ''}`}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          cardName={cardName}
        />
      ))}
    </div>
  );
}

export default OfferList;
