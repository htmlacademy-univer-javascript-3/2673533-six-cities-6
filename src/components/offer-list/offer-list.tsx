import { useState } from 'react';
import { Offers } from '../../types/offer';
import OfferCard from '../offer-card/offer-card';

type OfferListProps = {
  offers: Offers;
}

function OfferList({ offers }: OfferListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_activeOfferCard, setActiveOfferCard] = useState<string | null>(null);
  // Сверху заглушка для линтера, пока не используется activeOfferCard

  const handleMouseEnter = (offerCardId: string) => {
    setActiveOfferCard(offerCardId);
  };

  const handleMouseLeave = () => {
    setActiveOfferCard(null);
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
