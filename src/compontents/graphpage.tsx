import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import CovidLineGraph from "./linegraph";

// Fix icon issue with leaflet (default icon not displayed correctly)
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Fetch COVID data using axios
const fetchCovidData = async () => {
  const { data } = await axios.get("https://disease.sh/v3/covid-19/countries");
  return data;
};

const CovidMap = () => {
  // Use TanStack Query's useQuery hook
  const {
    data: countriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["covidData"],
    queryFn: fetchCovidData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data...</div>;

  return (
    <div className="grid grid-cols-1">
      <h1 className="text-center p-5 text-muted-foreground text-2xl font-bold">COVID-19 Map</h1>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ minHeight: "400px", width: "100%",padding: "0 20px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countriesData.length > 0 &&
          countriesData.map((country: any) => (
            <Marker
              key={
                country.countryInfo._id ||
                country.countryInfo.iso2 ||
                country.country
              }
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h3>{country.country}</h3>
                  <p>Active: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      <div>
        <CovidLineGraph />
      </div>
    </div>
  );
};

export default CovidMap;
