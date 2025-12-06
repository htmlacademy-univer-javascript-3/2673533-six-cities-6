type OfferTypeProps = {
  value: string;
}

function OfferType({ value }: OfferTypeProps): JSX.Element {
  return (
    <p className="place-card__type">{value}</p>
  );
}

export default OfferType;
