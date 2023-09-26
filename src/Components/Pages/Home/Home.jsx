
import React, { useEffect, useState } from 'react'
import { Map } from '../../Layouts/Map/Map'
import { render } from '@testing-library/react';

export const Home = () => {

    const [grafo, setGrafo] = useState(null);
    const [jsonFile, setJsonFile] = useState(null)

    // useEffect(() => {
       
    //     fetch('json/Nodes.json')
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setGrafo(data)
    //         // console.log(data);
    //     })
    //       .catch((error) => console.error('Error al cargar el archivo JSON', error));
    //   }, []);

    const upFile =  (event) =>{
        const file = event.target.files[0];
        if (file) {
            setJsonFile(file)
        }
    };



    const loadFile = () => {
      if (jsonFile) {
        // console.log(jsonFile);
        const reader = new FileReader();
    
        reader.onload = (e) => {
          // console.log(e.target.result);
          const contentFile = e.target.result;
          // console.log(contentFile);
    
          // Aquí puedes hacer lo que necesites con el contenido del archivo JSON
          // Por ejemplo, puedes analizar el contenido JSON si es necesario
          try {
            const jsonData = JSON.parse(contentFile);
            console.log(jsonData);
            setGrafo(jsonData)

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
        

        // if (jsonFile) {
        //     alert("bgbg")
        //     const reader = new FileReader();
        //     render.onload = (e) =>{
        //         console.log(e.target.result);
        //         const contentFile = e.target.result;
        //         console.log(contentFile);
        //     };
        //     reader.readAsText(jsonFile)
        //  }else{
        //     console.log("no file found");
        //  }
    
  
    return (
    <div id='mainHome'>
        <Map/>
        <aside className='asideHome'>
            <h2>Puntos De Entrega</h2>
            <ul>
            {grafo ? (
              grafo.ubicaciones.map((ubi, index) => (
                <li key={index}>{ubi.nombre}, {ubi.posX}, {ubi.posY}</li>
              ))
            ) : (
              <p>Cargando datos del grafo...</p>
            )}
            
            <h2>Conexiones</h2>
            {grafo ? (
              grafo.conexiones.map((cone, index) => (
                <li key={index}>{cone.ubicacion1}, {cone.ubicacion2}, Peso-{cone.peso}</li>
              ))
            ) : (
              <p>Cargando datos del grafo...</p>
            )}


          </ul>
          
          <input  onChange={upFile} type="file"/>
          <button onClick={loadFile}>Subir Archivo</button>
        </aside>
    </div>
  )
}
