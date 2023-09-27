
import React, { useEffect, useState } from 'react'
import { Map } from '../../Layouts/Map/Map'


export const Home = () => {

    const [grafo, setGrafo] = useState(null);
    const [jsonFile, setJsonFile] = useState(null)
    // const [latOrigin, setLatOrigin] = useState(null)
    // const [lngOrigin, setLngOrigin] = useState(null)
    const [ubiOrigin, setUbiOrigin] = useState(null)


    const upFile =  (event) =>{
        const file = event.target.files[0];
        if (file) {
            setJsonFile(file)
        }
    };


    
    const loadFile = () => {
      if (jsonFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const contentFile = e.target.result;
          // Se accede al contenido del archvo json
          try {
            // Parseamos el archivo para poder visualizarlo como json y lo almacenamos en el estado setGrefo
            const jsonData = JSON.parse(contentFile);
            // console.log(jsonData);
            setGrafo(jsonData)
            findOrigin(jsonData)

            // Ahora jsonData contiene el objeto JavaScript correspondiente al archivo JSON
            // Puedes almacenarlo en tu estado o realizar otras acciones con él.
          } catch (error) {
            console.error("Error al analizar el archivo JSON:", error);
          }
        };
    
        reader.readAsText(jsonFile);
      } else {
        console.log("No se encontró ningún archivo.");
      }
    };


    useEffect(() => {
      loadFile();
    }, []);


    useEffect(() => {
      // Este efecto se activará cada vez que ubiOrigin cambie
      console.log("ubiOrigin actualizado:", ubiOrigin);
    }, [ubiOrigin]);
        
    const findOrigin =  (jsonData) => {

      if (jsonData && jsonData.ubicaciones) {
        console.log(jsonData);
    
        jsonData.ubicaciones.forEach((ubi) => {
          if (ubi?.nombre === jsonData?.inicio) {
            setUbiOrigin(ubi)
            console.log(ubi);
            console.log(ubiOrigin);
          }
          // console.log(ubi.nombre);
          // console.log(jsonData.inicio);
        });
      } else {
        console.log(`No se encontró ninguna ubicación con el nombre ${jsonData.inicio}`);
      }
      
    };
    
    // if (jsonData && jsonData?.ubicaciones) {
    //   const ubicacionEncontrada = jsonData?.ubicaciones.find((ubi) => ubi.nombre === grafo?.inicio);
    //   // console.log(ubi.name);
      
    //   if (ubicacionEncontrada) {
    //     setUbiOrigin(ubicacionEncontrada);
    //   } else {
    //     console.log(`No se encontró ninguna ubicación con el nombre ${jsonData.inicio}`);
    //   }
    // } else {
    //   console.log('No hay datos de ubicación disponibles en el grafo.');
    // }4.805938-75.756070



    return (
      <div id='mainHome'>
        <Map latitud={ubiOrigin ? ubiOrigin.posY : 4.805938} longitud={ubiOrigin ? ubiOrigin.posX : -75.756070} />
          <aside className='asideHome'>
            <h2>Puntos De Entrega</h2>
            <ul>
            {grafo ? (
              grafo.ubicaciones.map((ubi, index) => (
                <li key={index}>{ubi.nombre}, Lng-{ubi.posX}, Lat-{ubi.posY}</li>
              ))
            ) : (
              <p>Carga tu archivo...</p>
            )}
          </ul>

            
            <h2>Conexiones</h2>


            {grafo ? (
              grafo.conexiones.map((cone, index) => (
                <li key={index}>{cone.ubicacion1}, {cone.ubicacion2}, Peso-{cone.peso}</li>
              ))
            ) : (
              <p>Y tendras la mejor ruta...</p>
            )}


          <h2 id='tittleOrigin'>Punto de Inicio</h2>
          <p>{grafo?.inicio}</p>


          
          <input  onChange={upFile} type="file"/>
          <button onClick={loadFile}>Subir Archivo</button>
        </aside>
    </div>
  )
}
