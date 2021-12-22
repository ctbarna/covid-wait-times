import React, { useState, useEffect, useContext } from "react";
import { LocationContext } from "./LocationStore";
import { scaleLinear } from "d3-scale";
import { waitTimeMapping } from "../utils/fetchData";
const mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const formatPopup = (location: WaitTime) => (`
  <div class="font-sans px-2">
    <h3 class="text-lg font-bold py-2">Location</h3>
    <div class="text-md">${location.fullname}</div>
    <div class="text-md">${location.address}</div>
    <h3 class="text-lg font-bold py-2">Wait Time</h3>
    <div class="text-md">${location.wait_time}</div>
  </div>
`);

const Map = () => {
  const [pageIsMounted, setPageIsMounted] = useState(false)

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

  const colorScale = (time: number) => time === 6
    ? "#ccc"
    : scaleLinear()
      .domain([0, 2, 3, 5]) // see `waitTimeMapping` in utils > fetchData.ts
      .range(["#006837", "#e8db2a", "#f16e43", "#a50026"])(time)

  useEffect(() => {
    setPageIsMounted(true);
    const map = new mapboxgl.Map({
      container: 'sites-map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [-74.0183, 40.7077], // starting position [lng, lat]
      zoom: 11 // starting zoom
    });

    locations.forEach((loc): WaitTime => {
      const { lat, lng, ordinal_wait_time } = loc;
      new mapboxgl.Marker({ color: colorScale(ordinal_wait_time) })
        .setLngLat({ lat, lng })
        .setPopup(new mapboxgl.Popup().setHTML(formatPopup(loc)))
        .addTo(map)
    })

  })

  return (
    <div id="sites-map" style={{ height: '75vh' }} >
      <div className={`absolute z-10 top-2 left-2 bg-white p-2 rounded-sm ${pageIsMounted ? '' : 'hidden'}`}>
        {Object.entries(waitTimeMapping).map(([key, time]) => <div key={key}><span style={{ backgroundColor: colorScale(time) }} className="inline-block w-3 h-3 mr-2" />{key}</div>)}
      </div>
    </div>
  );
};

export default Map;
