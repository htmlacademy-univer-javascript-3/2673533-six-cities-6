import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { ACTIVE_PIN, CITIES, DEFAULT_PIN } from '../../const';
import useMap from '../../hooks/use-map';
import { Offers } from '../../types/offer';

type MainMapProps = {
  cityName: string;
  offers: Offers;
  selectedOfferId: string;
}

function MainMap({ cityName, offers, selectedOfferId }: MainMapProps) {
  const mapRef = useRef(null);
  const markersRef = useRef<Marker[]>([]);

  const city = CITIES.find((c) => c.name === cityName)!;
  const map = useMap(mapRef, city);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    if (map) {
      clearMarkers();
      offers.forEach((offer) => {
        const marker = leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === selectedOfferId) ? ACTIVE_PIN : DEFAULT_PIN,
          })
          .addTo(map);
        markersRef.current.push(marker);
      });
    }
  }, [map, offers, selectedOfferId]);

  useEffect(() => () => {
    if (map) {
      clearMarkers();
    }
  }, [map]);

  return (
    <section className="cities__map map" ref={mapRef} />
  );
}

export default MainMap;
