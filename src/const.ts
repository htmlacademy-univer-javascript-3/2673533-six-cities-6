export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favourites = '/favorites',
  Offer = '/offer/:id',
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export const CITIES = Object.values(CityName);

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Pin {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg',
}
