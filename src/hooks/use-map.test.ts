import { renderHook } from '@testing-library/react';
import useMap from './use-map';

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => ({
      setView: vi.fn(),
      remove: vi.fn(),
    })),
    tileLayer: vi.fn().mockReturnValue({
      addTo: vi.fn(),
    }),
  },
  Map: vi.fn(),
}));

describe('Hook: useMap', () => {
  it('should return non-null value when ref is provided', () => {
    const mockCity = {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
      },
    };
    const mockMapRef = {current: document.createElement('div')};

    const { result } = renderHook(() => useMap(mockMapRef, mockCity));

    expect(result.current).not.toBeNull();
  });

  it('should return null when ref is null', () => {
    const mockCity = {
      name: 'Paris',
      location: {
        latitude: 48.8566,
        longitude: 2.3522,
        zoom: 12,
      },
    };
    const nullRef = { current: null };

    const { result } = renderHook(() => useMap(nullRef, mockCity));

    expect(result.current).toBeNull();
  });
});
