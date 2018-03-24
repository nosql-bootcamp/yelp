const UPDATE_LOCATION = "UPDATE_LOCATION";

export const defaultLocation = { lat: 40, lon: -70 };

export function updateLocation(location) {
  return { type: UPDATE_LOCATION, location };
}

export default function location(state = defaultLocation, action) {
  switch (action.type) {
    case UPDATE_LOCATION:
      return action.location;
    default:
      return state;
  }
}
