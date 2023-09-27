
import React, { useContext, useEffect, useState } from 'react'
import { Map } from '../../Layouts/Map/Map'
import axios from 'axios';
import { FormGroup } from '../../UI/FormGroup/Formgroup'
import { UserDataContext } from '../Context/UserDataProvider'



export const Home = () => {

    const [grafo, setGrafo] = useState(null);
    const [jsonFile, setJsonFile] = useState(null)
    const [ubiOrigin, setUbiOrigin] = useState(null)
    const {updateUserData} = useContext(UserDataContext);
    const { userData} = useContext(UserDataContext);

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
            updateUserData(jsonData)
            // console.log(jsonData);
            upLocations(jsonData)
            makeRoute()

            // Ahora jsonData contiene el objeto JavaScript correspondiente al archivo JSON
            // Puedes almacenarlo en tu estado o realizar otras acciones con él.
          } catch (error) {
            console.error("Error al analizar el archivo JSON:", error);
          }
        };
    
        reader.readAsText(jsonFile);
      } else {
        // console.log("No se encontró ningún archivo.");
      }
    };


    useEffect(() => {
      loadFile();
    }, []);


    useEffect(() => {
      // Este efecto se activará cada vez que ubiOrigin cambie
      // console.log("ubiOrigin actualizado:", ubiOrigin);
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
    
    const upLocations = async(filejson) =>{
      const fileData = {
      
      }

      try {
        const response = await axios.post("http://localhost:5000/api/users/saveLocations", fileData)
        console.log(response);
        
      } catch (error) {
        console.log(error);
        
      }

    }









    const makeRoute = () => {
      const grafo = {};
    
      // Crear el grafo a partir de userData.conexiones
      userData?.conexiones?.forEach((conexion) => {
        const { ubicacion1, ubicacion2, peso } = conexion;
        if (!grafo[ubicacion1]) {
          grafo[ubicacion1] = [];
        }
        if (!grafo[ubicacion2]) {
          grafo[ubicacion2] = [];
        }
        grafo[ubicacion1].push({ ubicacion: ubicacion2, peso });
        grafo[ubicacion2].push({ ubicacion: ubicacion1, peso });
      });
    
      const findShortestDistances = (grafo, inicio) => {
        const distances = {};
        const padres = {};
        const nodosNoVisitados = new Set(Object.keys(grafo));
    
        // Inicializa las distancias a infinito y el nodo inicial a 0.
        Object.keys(grafo).forEach((nodo) => {
          distances[nodo] = Infinity;
        });
        distances[inicio] = 0;
    
        while (nodosNoVisitados.size > 0) {
          const nodoActual = obtenerNodoConMenorDistancia(nodosNoVisitados, distances);
          nodosNoVisitados.delete(nodoActual);
    
          for (const conexion of grafo[nodoActual]) {
            const vecino = conexion.ubicacion;
            const peso = conexion.peso;
            const distanciaHastaVecino = distances[nodoActual] + peso;
    
            if (distanciaHastaVecino < distances[vecino]) {
              distances[vecino] = distanciaHastaVecino;
              padres[vecino] = nodoActual;
            }
          }
        }
    
        return distances;
      };
    
      const obtenerNodoConMenorDistancia = (nodosNoVisitados, distances) => {
        return Array.from(nodosNoVisitados).reduce((nodoMenorDistancia, nodo) => {
          if (!nodoMenorDistancia || distances[nodo] < distances[nodoMenorDistancia]) {
            return nodo;
          }
          return nodoMenorDistancia;
        }, null);
      };
    
      const distances = findShortestDistances(grafo, userData.inicio);
    
      console.log("Distancias desde el punto de inicio:");
      for (const ubicacion in distances) {
        console.log(`${ubicacion}: ${distances[ubicacion]}`);
      }
    };
    

    return (
      <div id='mainHome'>
        <Map latitud={ubiOrigin ? ubiOrigin.posY : 4.805938} longitud={ubiOrigin ? ubiOrigin.posX : -75.756070} />
          <aside className='asideHome'>
            <h2>Puntos De Entrega</h2>
            <ul>
            {grafo ? (
              userData.ubicaciones.map((ubi, index) => (
                <li key={index}>{ubi.nombre}, Lng-{ubi.posX}, Lat-{ubi.posY}</li>
              ))
            ) : (
              <p>Carga tu archivo...</p>
            )}
          </ul>
            <h2>Conexiones</h2>

            {grafo ? (
              userData.conexiones.map((cone, index) => (
                <li key={index}>{cone.ubicacion1}, {cone.ubicacion2}, Peso-{cone.peso}</li>
              ))
            ) : (
              <p>Y tendras la mejor ruta...</p>
            )}


          <h2 id='tittleOrigin'>Punto de Inicio</h2>
          <p>{grafo?.inicio}</p>


          
          {/* <input  onChange={upFile} type="file"/> */}
          <FormGroup onChange={upFile} inputType={"file"}/>


          <button onClick={loadFile}>Subir Archivo</button>
        </aside>
    </div>
  )
}
