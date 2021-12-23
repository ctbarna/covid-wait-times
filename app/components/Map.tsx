import React, { useEffect, useContext, useRef } from "react";
import { LocationContext } from "./LocationStore";
import { scaleLinear } from "d3-scale";
import waitTimeMapping from "../utils/waitTimeMapping";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const formatPopup = (location: WaitTime) => `
  <div class="font-sans px-2">
    <h3 class="text-lg font-bold py-2">Location</h3>
    <div class="text-md">${location.fullname}</div>
    <div class="text-md">${location.address}</div>
    <h3 class="text-lg font-bold py-2">Details</h3>
    <div class="text-md">Wait Time: ${location.wait_time}</div>
    <div class="text-md">Last Reported: ${location.last_reported}</div>
  </div>
`;

const colorScale = (time: number) =>
  time === 6
    ? "#ccc"
    : scaleLinear<string>()
        .domain([0, 2, 3, 5]) // see `waitTimeMapping` in utils > fetchData.ts
        .range(["#006837", "#e8db2a", "#f16e43", "#a50026"])(time);

const Marker = ({
  location,
  mapRef,
}: {
  location: WaitTime;
  mapRef: React.RefObject<typeof mapboxgl.Map>;
}) => {
  const markerRef = useRef<typeof mapboxgl.Marker>();
  useEffect(() => {
    markerRef.current = new mapboxgl.Marker({
      color: colorScale(location.ordinal_wait_time),
    })
      .setLngLat({ lat: location.lat, lng: location.lng })
      .setPopup(new mapboxgl.Popup().setHTML(formatPopup(location)))
      .addTo(mapRef.current);

    return () => {
      if (markerRef.current) markerRef.current.remove();
    };
  }, [location, mapRef]);

  return null;
};

const Map = () => {
  const mapRef = useRef<typeof mapboxgl.Map>(null);

  const { selector } = useContext(LocationContext);

  const locations: WaitTime[] = selector((state) => {
    const search = state.search.toLowerCase();
    return state.locations.filter(
      (location) =>
        location.fullname.toLowerCase().includes(search) ||
        location.address.toLowerCase().includes(search) ||
        location.borough.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: "sites-map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-74.0183, 40.7077], // starting position [lng, lat]
        zoom: 11, // starting zoom
      });
    }
  });

  return (
    <div id="sites-map" style={{ height: "75vh" }}>
      <div
        className={`absolute z-10 top-2 left-2 bg-white p-2 rounded-sm ${
          mapRef.current ? "" : "hidden"
        }`}
      >
        {mapRef.current &&
          locations.map((location) => (
            <Marker
              key={location.location}
              location={location}
              mapRef={mapRef}
            />
          ))}
        {Object.entries(waitTimeMapping).map(([key, time]) => (
          <div key={key}>
            <span
              style={{ backgroundColor: colorScale(time) }}
              className="inline-block w-3 h-3 mr-2"
            />
            {key}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Map;
