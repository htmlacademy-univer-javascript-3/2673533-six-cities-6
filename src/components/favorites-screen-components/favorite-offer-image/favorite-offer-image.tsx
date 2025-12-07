type FavoriteOfferImageProps = {
  src: string;
}

function FavoriteOfferImage({ src }: FavoriteOfferImageProps): JSX.Element {
  return (
    <div className="favorites__image-wrapper place-card__image-wrapper">
      <img className="place-card__image" src={src} width="150" height="110" alt="Place image" />
    </div>
  );
}

export default FavoriteOfferImage;
