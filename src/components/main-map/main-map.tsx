import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../../types/city';
import { useEffect, useRef } from 'react';
import { Pin } from '../../const';
import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offer';

type MainMapProps = {
  city: City;
  offers: Offers;
  selectedOfferId: string;
}

const defaultPin = leaflet.icon({
  iconUrl: Pin.Default,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activePin = leaflet.icon({
  iconUrl: Pin.Active,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function MainMap({ city, offers, selectedOfferId }: MainMapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === selectedOfferId) ? activePin : defaultPin,
          })
          .addTo(map);
      });
    }
  }, [map, offers, selectedOfferId]);

  return (
    <section
      className="cities__map map"
      ref={mapRef}
    >
    </section>
  );
}

export default MainMap;
