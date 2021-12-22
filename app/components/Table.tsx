import Link from "next/link";
import React, { useContext } from "react";
import slugify from "../utils/slugify";
import { LocationContext } from "./LocationStore";
import { event } from "../utils/gtag";

const TableHeader = ({
  orderingKey,
  children,
}: {
  orderingKey: keyof WaitTime;
  children: React.ReactNode;
}) => {
  const {
    dispatch,
    state: { ordering },
  } = useContext(LocationContext);

  const onChangeOrder = () => {
    if (ordering.key === orderingKey) {
      switch (ordering.direction) {
        case "asc":
          event({
            action: "order",
            category: orderingKey,
            label: "desc",
          });
          dispatch({
            type: "ORDER",
            payload: { key: orderingKey, direction: "desc" },
          });
          return;
        case "desc":
          event({
            action: "order",
            category: "reset",
          });
          dispatch({
            type: "RESET",
          });
          return;
      }
    }
    event({
      action: "order",
      category: orderingKey,
      label: "asc",
    });
    dispatch({
      type: "ORDER",
      payload: { key: orderingKey, direction: "asc" },
    });
  };

  return (
    <th className="p-2 text-left">
      <button className="font-bold" onClick={onChangeOrder}>
        {children}{" "}
        {ordering.key === orderingKey && ordering.direction === "asc" && (
          <span>&#9650;</span>
        )}
        {ordering.key === orderingKey && ordering.direction === "desc" && (
          <span>&#9660;</span>
        )}
      </button>
    </th>
  );
};

const Table = () => {
  const { selector } = useContext(LocationContext);

  const locations = selector((state) => {
    const search = state.search.toLowerCase();
    const locations = state.locations.filter(
      (location) =>
        location.fullname.toLowerCase().includes(search) ||
        location.address.toLowerCase().includes(search) ||
        location.borough.toLowerCase().includes(search)
    );

    if (state.ordering.key === "") {
      return locations;
    }

    const key = state.ordering.key;
    const direction = state.ordering.direction;

    return locations.sort((a, b) => {
      if (direction === "asc") {
        return a[key] < b[key] ? -1 : 1;
      }

      return a[key] > b[key] ? -1 : 1;
    });
  });

  if (!locations.length) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Check Back Later</h1>
        <p className="text-lg">
          Testing line wait times are only available while testing sites are
          open.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full text-sm">
        <thead className="font-bold bg-slate-300 border-b border-b-black">
          <TableHeader orderingKey="fullname">Location</TableHeader>
          <TableHeader orderingKey="ordinal_wait_time">Wait Time</TableHeader>
          <TableHeader orderingKey="last_reported">Last Reported</TableHeader>
          <TableHeader orderingKey="borough">Borough</TableHeader>
          <TableHeader orderingKey="address">Address</TableHeader>
        </thead>
        <tbody>
          {locations.map((location, i) => (
            <tr key={location.fullname}>
              <td className="p-2">
                <Link href={`/location/${slugify(location.location)}`} passHref>
                  <a className="font-bold text-blue-600 hover:text-blue-500">
                    {location.fullname}
                  </a>
                </Link>
              </td>
              <td className="p-2">{location.wait_time}</td>
              <td className="p-2">{location.last_reported}</td>
              <td className="p-2">
                <Link href={`/borough/${slugify(location.borough)}`} passHref>
                  <a className="text-blue-600 hover:text-blue-500 underline">
                    {location.borough}
                  </a>
                </Link>
              </td>
              <td className="p-2">{location.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
