import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { Link } from "react-router-dom";
import { locations } from "@/data/locations";
import "leaflet/dist/leaflet.css";

// Coordinates for each location
const coords: Record<string, [number, number]> = {
  erfurt: [50.9787, 11.0328],
  apolda: [51.0263, 11.5153],
  weimar: [50.9795, 11.3235],
  "gera-debschwitz": [50.8667, 12.0833],
  "gera-zentrum": [50.8787, 12.0826],
};

const redIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const LocationsMap = () => {
  return (
    <MapContainer
      center={[50.93, 11.55]}
      zoom={9}
      scrollWheelZoom={false}
      className="h-[400px] w-full rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((loc) => {
        const pos = coords[loc.slug];
        if (!pos) return null;
        return (
          <Marker key={loc.slug} position={pos} icon={redIcon}>
            <Popup>
              <div className="text-center">
                <strong className="block mb-1">{loc.name}</strong>
                <span className="text-xs block mb-2">{loc.address}, {loc.zip}</span>
                <Link
                  to={`/standorte/${loc.slug}`}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Zum Standort →
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default LocationsMap;
