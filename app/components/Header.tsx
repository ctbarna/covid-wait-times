import React, { useContext } from "react";
import { LocationContext } from "./LocationStore";
const Header = ({ children }: { children: React.ReactNode }) => {
  const { dispatch } = useContext(LocationContext);

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SEARCH", payload: e.target.value });
  };

  return (
    <div className="lg:flex lg:items-center lg:justify-between p-2 md:p-0 pb-0">
      <div className="flex-1 min-w-0">{children}</div>
      <div className="flex-shrink-0">
        <input
          type="text"
          placeholder="Search..."
          className="border p-1"
          onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default Header;
