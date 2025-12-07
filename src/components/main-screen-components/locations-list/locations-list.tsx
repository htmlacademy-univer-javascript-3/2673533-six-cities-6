import { CITIES } from '../../../const';
import { useAppDispatch } from '../../../hooks';
import { setActiveCity } from '../../../store/main-screen-process/main-screen-process';

type LocationsListProps = {
  activeCity: string;
}

function LocationsList({ activeCity } : LocationsListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleOnCityClick = (cityName: string) => {
    dispatch(setActiveCity(cityName));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li className="locations__item" key={city.name}>
              <a className={`locations__item-link tabs__item ${city.name === activeCity ? 'tabs__item--active' : ''}`}
                onClick={(evt) => {
                  evt.preventDefault();
                  handleOnCityClick(city.name);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default LocationsList;
