import OfferGalleryImage from '../offer-gallery-image/offer-gallery-image';

type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({ images } : OfferGalleryProps): JSX.Element {
  const displayImages = images.slice(0, 6);
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {displayImages.map((src) => (
          <OfferGalleryImage
            key={src}
            src={src}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
