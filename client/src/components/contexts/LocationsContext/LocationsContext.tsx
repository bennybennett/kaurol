import React, { createContext, useEffect, useReducer } from 'react';
import { getAllLocationsWithSublocations } from '../../../api/locations';
import { ILocation } from '../../../../../shared/types/entry';

const locationsReducer = (state: ILocation[], action: any) => {
  switch (action.type) {
    case 'UPDATE_LOCATIONS':
      return action.locations;
    default:
      return state;
  }
};

export const LocationsContext = createContext<ILocation[]>([]);
export const LocationsDispatchContext = createContext<React.Dispatch<any>>(
  () => {}
);

export const LocationsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [locations, dispatch] = useReducer(locationsReducer, []);

  useEffect(() => {
    async function fetchLocations() {
      const data = await getAllLocationsWithSublocations();
      dispatch({ type: 'UPDATE_LOCATIONS', locations: data });
    }

    fetchLocations();
  }, []);

  return (
    <LocationsContext.Provider value={locations}>
      <LocationsDispatchContext.Provider value={dispatch}>
        {children}
      </LocationsDispatchContext.Provider>
    </LocationsContext.Provider>
  );
};
