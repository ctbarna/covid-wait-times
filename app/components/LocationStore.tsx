import React, { ReducerAction, useReducer } from "react";

type ReducerState = {
  locations: WaitTime[];
  search: string;
  ordering: {
    key: keyof WaitTime | "";
    direction: "asc" | "desc" | "";
  };
};

type LocationActions =
  | { type: "SEARCH"; payload: string }
  | {
      type: "ORDER";
      payload: { key: keyof WaitTime; direction: "asc" | "desc" };
    }
  | { type: "RESET" };

type LocationContextType = {
  state: ReducerState;
  dispatch: (action: LocationActions) => void;
  selector: (callback: (state: ReducerState) => WaitTime[]) => WaitTime[];
};

const init = (locations: WaitTime[]): ReducerState => ({
  locations,
  search: "",
  ordering: {
    key: "",
    direction: "",
  },
});

export const LocationContext = React.createContext<LocationContextType>({
  state: init([]),
  dispatch: () => {},
  selector: () => [],
});

const reducer = (
  state: ReducerState,
  action: LocationActions
): ReducerState => {
  switch (action.type) {
    case "SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "ORDER":
      return {
        ...state,
        ordering: action.payload,
      };

    case "RESET":
      return {
        ...state,
        ordering: {
          key: "",
          direction: "",
        },
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
