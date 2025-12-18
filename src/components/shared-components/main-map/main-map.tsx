import leaflet, { Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { ACTIVE_PIN, CITIES, DEFAULT_PIN } from '../../../const';
import useMap from '../../../hooks/use-map';
import { Offers } from '../../../types/offer';
import { useAppSelector } from '../../../hooks';
import { getActiveOfferId } from '../../../store/main-screen-process/selectors';

type MainMapProps = {
  cityName: string;
  offers: Offers;
  selectedOfferId?: string;
  className: string;
}

function MainMap({ cityName, offers, selectedOfferId, className }: MainMapProps) {
  const mapRef = useRef(null);
  const markersRef = useRef<Marker[]>([]);
  const activeOfferIdFromStore = useAppSelector(getActiveOfferId);

  const activeOfferId = selectedOfferId || activeOfferIdFromStore;

  const city = CITIES.find((c) => c.name === cityName)!;
  const map = useMap(mapRef, city);

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (map) {
        clearMarkers();
        offers.forEach((offer) => {
          const marker = leaflet
            .marker({
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            }, {
              icon: (offer.id === activeOfferId) ? ACTIVE_PIN : DEFAULT_PIN,
            })
            .addTo(map);
          markersRef.current.push(marker);
        });
      }
    }

    return () => {
      if (map) {
        isMounted = false;
        clearMarkers();
      }
    };
  }, [map, offers, activeOfferId]);

  return (
    <section className={`${className}__map map`} ref={mapRef} data-testid='map' />
  );
}

export default MainMap;
