type OfferImageProps = {
  src: string;
  cardName: string;
}

function OfferImage({ src, cardName }: OfferImageProps): JSX.Element {
  return (
    <div className={`${cardName}__image-wrapper place-card__image-wrapper`}>
      <a href="#">
        <img className="place-card__image" src={src} width="260" height="200" alt="Place image" />
      </a>
    </div>
  );
}

export default OfferImage;
