import LatLon from 'geodesy/latlon-ellipsoidal-vincenty';

export const canGeolocate = () => 'geolocation' in navigator;

export const detectUserLocation = () =>
  new Promise((resolve, reject) => {
    if (!canGeolocate()) {
      reject(new Error('Gelocation not possible0'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error)
    );
  });

export const distanceBetween = ([lat1, lon1], [lat2, lon2]) => {
  const p1 = new LatLon(lat1, lon1);
  const p2 = new LatLon(lat2, lon2);

  return p1.distanceTo(p2);
};
