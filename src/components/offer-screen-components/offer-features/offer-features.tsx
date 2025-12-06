type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
}

function OfferFeatures({ type, bedrooms, maxAdults }: OfferFeaturesProps): JSX.Element {
  const bedroomsForm = bedrooms === 1 ? 'Bedroom' : 'Bedrooms';
  const maxAdultsForm = maxAdults === 1 ? 'adult' : 'adults';

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {type}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} {bedroomsForm}
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} {maxAdultsForm}
      </li>
    </ul>
  );
}

export default OfferFeatures;
