import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, Popup} from "react-leaflet"
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css"
import { useRef } from 'react';

// import "./Map.css"

export const Map = ({nameParking, latitud, longitud}) => {

    const marker = {
        geocode: [],
        popUp: nameParking
      };
      const [markerLocation, setMarkerLocation] = useState(null);
      const markerRef = useRef(null);

      const AddMarkerOnClick = ({ setMarkerLocation }) => {
        useMapEvents({
          click: (e) => {
            setMarkerLocation(e.latlng);
          },
        });
        if (markerRef.current) {
          markerRef.current.openPopup();
          
        }
      
        return null;
      };
      const [center, setCenter] = useState([4.805938, -75.756070])
    
      if (typeof latitud === 'number' && typeof longitud === 'number') {
          marker.geocode.push(latitud, longitud);
      }


      useEffect(() => {
        // Verifica si las coordenadas son números válidos
        if (typeof latitud === 'number' && typeof longitud === 'number') {
          setCenter([latitud, longitud]);
        }
      }, [latitud, longitud]);
    
      const customIcon = new Icon({
        iconUrl: "https://res.cloudinary.com/dbenwgwfn/image/upload/v1682304566/Cancheros-Map/marcador-de-posicion_nrteik.png",
        iconSize: [38, 38]
      }
      )
          return (
      <div className="Bg-MapParking">
        {/* <p className='messageMap'>Ubicación</p> */}
      <MapContainer center={[latitud, longitud]} zoom={17} style={{width: 900, height: "100vh"}  }>
    <TileLayer 
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' 
    />
        <Marker ref={markerRef} position={marker.geocode} icon={customIcon}>
        {/* <Popup>{marker.popUp}</Popup> */}
      </Marker>

      {markerLocation && (
          <Marker position={markerLocation} icon={customIcon}>
            <Popup auto={true}>Tu ubicación seleccionada
              <button>click</button>
            </Popup>
          </Marker>
        )}
        <AddMarkerOnClick setMarkerLocation={setMarkerLocation} />



  </MapContainer>
    </div>
  )
}