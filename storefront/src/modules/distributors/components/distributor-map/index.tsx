"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import { Distributor } from "../../../../types/distributor";
import MapController from "@modules/distributors/components/distributor-map/map-controller";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import DistributorInfo from "@modules/distributors/components/distributor-info";

const markerIcon = L.icon({
  iconUrl: "/icons/pin.png",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

type Props = {
  distributors: Distributor[];
  selectedDistributor: Distributor | null;
};

const DistributorMapComponent = ({
  distributors,
  selectedDistributor,
}: Props) => {
  return (
    <MapContainer scrollWheelZoom className="z-0 h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {distributors.map((distributor) => (
        <Marker
          key={distributor.id}
          icon={markerIcon}
          position={[
            distributor.coordinates.latitude,
            distributor.coordinates.longitude,
          ]}
        >
          <Popup>
            <DistributorInfo distributor={distributor} />
          </Popup>
        </Marker>
      ))}
      <MapController
        distributors={distributors}
        selectedDistributor={selectedDistributor}
      />
    </MapContainer>
  );
};

export default DistributorMapComponent;
