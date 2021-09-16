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
