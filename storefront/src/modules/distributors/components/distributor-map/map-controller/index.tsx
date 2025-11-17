import { useEffect } from "react";
import { Distributor } from "../../../../../types/distributor";
import { useMap } from "react-leaflet";

const ZOOM_LEVEL = 14;
const ANIMATION_DURATION = 1;

type Props = {
  distributors: Distributor[];
  selectedDistributor: Distributor | null;
};

const MapController = ({ distributors, selectedDistributor }: Props) => {
  const map = useMap();

  useEffect(() => {
    if (!distributors.length) {
      return;
    }

    if (selectedDistributor) {
      // center & zoom on selected distributor
      map.flyTo(
        [
          selectedDistributor.location.latitude,
          selectedDistributor.location.longitude,
        ],
        ZOOM_LEVEL,
        { duration: ANIMATION_DURATION },
      );
    } else {
      // show all distributors
      const coordinates = distributors.map((d) => [
        d.location.latitude,
        d.location.longitude,
      ]) as [number, number][];
      map.fitBounds(coordinates, { padding: [50, 50] });
    }
  }, [selectedDistributor, distributors, map]);

  return null;
};

export default MapController;
