"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const customIcon = new L.icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapSection({ position, title, des, phone }) {
  return (
    <div className="relative">
      <MapContainer
        className="border w-full h-full rounded-lg shadow-xl z-10"
        center={position}
        zoom={20}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>Set Coffee</Popup>
        </Marker>
      </MapContainer>
      <div className="bg-white items-center rounded-lg p-3 w-[96%] left-[2%] -bottom-20 flex flex-col gap-4 shadow-lg absolute z-10">
        <h4>فروشگاه ما</h4>
        <h2 className="font-bold text-lg text-zinc-800 text-center">{title}</h2>
        <p className="text-center">{des}</p>
        <span>{phone}</span>
        <Link
          href={"/about-us"}
          className="text-zinc-700 font-bold underline underline-offset-8 hover:text-zinc-500"
        >
          درباره فروشگاه
        </Link>
      </div>
    </div>
  );
}
