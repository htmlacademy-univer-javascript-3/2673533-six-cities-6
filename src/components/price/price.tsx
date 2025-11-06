type PriceProps = {
  priceValue: number;
}

function Price({ priceValue }: PriceProps): JSX.Element {
  return (
    <div className="place-card__price">
      <b className="place-card__price-value">&euro;{priceValue}</b>
      <span className="place-card__price-text">&#47;&nbsp;night</span>
    </div>
  );
}

export default Price;
