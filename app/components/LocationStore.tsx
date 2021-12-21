import React, { useReducer } from "react";

type ReducerState = {
  locations: WaitTime[];
  search: string;
};

type LocationContextType = {
  state: ReducerState;
  dispatch: (action: { type: string; payload: any }) => void;
  selector: (callback: (state: ReducerState) => WaitTime[]) => WaitTime[];
};

const init = (locations: WaitTime[]): ReducerState => ({
  locations,
  search: "",
});

export const LocationContext = React.createContext<LocationContextType>({
  state: init([]),
  dispatch: () => {},
  selector: () => [],
});

const reducer = (
  state: ReducerState,
  action: { type: string; payload: any }
): ReducerState => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    default:
      throw new Error();
  }
};

type Props = {
  children: React.ReactNode;
  initialLocations: WaitTime[];
};

const LocationStore = ({ children, initialLocations }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialLocations, init);

  const selector = (
    callback: (state: ReducerState) => WaitTime[]
  ): WaitTime[] => {
    return callback(state);
  };

  return (
    <LocationContext.Provider value={{ state, dispatch, selector }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationStore;
