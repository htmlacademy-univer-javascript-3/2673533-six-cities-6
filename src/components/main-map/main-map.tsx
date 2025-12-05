import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { CITIES, Pin } from '../../const';
import useMap from '../../hooks/use-map';
import { OffersList } from '../../types/offer';

type MainMapProps = {
  cityName: string;
  offers: OffersList;
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

function MainMap({ cityName, offers, selectedOfferId }: MainMapProps) {
  const mapRef = useRef(null);

  const city = CITIES.find((c) => c.name === cityName)!;
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
