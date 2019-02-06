/* eslint-disable import/prefer-default-export */
import { getDistance } from 'geolib';

function convertPositionToLatitudeLongitudeObject(position) {
  return { latitude: position.coords.latitude, longitude: position.coords.longitude };
}

function reduceObjectsContainingLatitudeAndLongitude(object) {
  return { latitude: object.latitude, longitude: object.longitude };
}

export function hasValidCoordinates(object) {
  try {
    const coordinatesObject = JSON.parse(object);
    return coordinatesObject.latitude !== undefined && coordinatesObject.longitude !== undefined;
  } catch (e) {
    return false;
  }
}

export function saveCoordinatesForUserFromGivenPosition(position) {
  const coordinates = convertPositionToLatitudeLongitudeObject(position);
  const coordinatesString = JSON.stringify(coordinates);
  localStorage.setItem('userCoords', coordinatesString);
  return true;
}

export function getCurrentCoordinatesForUserAndTriggerSuccessCallback(successCallback) {
  navigator.geolocation.getCurrentPosition(successCallback);
}

export function getDistanceBetweenTwoCoordinates(positionA, positionB) {
  /*
  Location arguments should be in the form of objects containing latitude and longitude values.
  e.g. { latitude: 5030, longitude: 298402 }
  */

  const coordinatesA = reduceObjectsContainingLatitudeAndLongitude(positionA);
  const coordinatesB = reduceObjectsContainingLatitudeAndLongitude(positionB);

  return getDistance(coordinatesA, coordinatesB);
}
