import { OffersList } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: OffersList;
  onActiveOfferIdChange: (newActiveOfferId: string) => void;
}

function OfferList({ offers, onActiveOfferIdChange }: OfferListProps): JSX.Element {
  const handleMouseEnter = (offerCardId: string) => {
    onActiveOfferIdChange(offerCardId);
  };

  const handleMouseLeave = () => {
    onActiveOfferIdChange('');
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  );
}

export default OfferList;
