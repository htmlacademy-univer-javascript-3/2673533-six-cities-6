import OfferInsideItem from '../offer-inside-item/offer-inside-item';

type OfferInsideListProps = {
  items: string[];
}

function OfferInsideList({ items } : OfferInsideListProps): JSX.Element {
  return (
    <div className="offer__inside">
      <h2 className="offer__inside-title">What&apos;s inside</h2>
      <ul className="offer__inside-list">
        {items.map((item) => (
          <OfferInsideItem key={item} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default OfferInsideList;
