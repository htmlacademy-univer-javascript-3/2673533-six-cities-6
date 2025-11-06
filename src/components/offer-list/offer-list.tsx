import { useState } from "react";
import { Offers } from "../../types/offer";
import OfferCard from "../offer-card/offer-card";

type OfferListProps = {
  offers: Offers;
}

function OfferList({ offers }: OfferListProps): JSX.Element {
  const [activeOfferCard, setActiveOfferCard] = useState<number | null>(null);

  const handleMouseEnter = (offerCardId: number) => {
    setActiveOfferCard(offerCardId);
    console.log(activeOfferCard); // для теста + чтобы значение использовалось как-то
  }

  const handleMouseLeave = () => {
    setActiveOfferCard(null);
    console.log(activeOfferCard); // аналогично
  }

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
