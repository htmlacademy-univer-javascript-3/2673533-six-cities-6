import { Link } from "react-router-dom";
import { AppRoute } from "../../const";

type OfferNameProps = {
  offerName: string;
  offerId: number;
}

function OfferName({ offerName, offerId }: OfferNameProps): JSX.Element {
  return (
    <h2 className="place-card__name">
      <Link to={AppRoute.Offer.replace(':id', String(offerId))}>
        {offerName}
      </Link>
    </h2>
  );
}

export default OfferName;
