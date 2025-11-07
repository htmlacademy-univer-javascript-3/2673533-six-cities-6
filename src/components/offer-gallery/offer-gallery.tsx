import OfferGalleryImage from '../offer-gallery-image/offer-gallery-image';

type OfferGalleryProps = {
  images: string[];
}

function OfferGallery({ images } : OfferGalleryProps): JSX.Element {
  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {images.map((src) => (
          <OfferGalleryImage
            key={src}// При условии, что все фотографии уникальны
            src={src}
          />
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
