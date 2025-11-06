import { useState } from "react";
import { Offers } from "../../types/offer";
import OfferCard from "../offer-card/offer-card";

type OfferListProps = {
  offers: Offers;
}

function OfferList({ offers }: OfferListProps): JSX.Element {
  const [activeOfferCard, setActiveOfferCard] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onMouseEnter={(offerCardId) => {
            setActiveOfferCard(offerCardId);
            console.log(activeOfferCard); // для теста + чтобы значение использовалось как-то
          }}
          onMouseLeave={() => {
            setActiveOfferCard(null);
            console.log(activeOfferCard); // аналогично
          }}
        />
      ))}
    </div>
  );
}

export default OfferList;
