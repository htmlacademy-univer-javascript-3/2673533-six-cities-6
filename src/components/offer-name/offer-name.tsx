type OfferNameProps = {
  value: string;
}

function OfferName({ value }: OfferNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <a href="#">{value}</a>
    </h2>
  );
}

export default OfferName;
