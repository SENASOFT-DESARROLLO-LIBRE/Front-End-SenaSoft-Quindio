import axios from 'axios';
import React, { useState } from 'react'
import { FormGroup } from '../../UI/FormGroup/Formgroup';
import { useNavigate } from 'react-router-dom';



export const FormLogin = () => {

        // Use Navigate para navegar entre las rutas
        const navigate = useNavigate()


        // Modulo Inicio de sesión
        const [inputs, setInputs] = useState({
            emailCreate: "",
            passwordCreate: ""
        });
        const { emailCreate, passwordCreate } = inputs;
    
        const getInput = (e) =>{
            setInputs({...inputs, [e.target.name]: e.target.value})
        }
    
        const onSubmitLogin = async(e) => {
            e.preventDefault()
    
            const Usuario = {
              emailCreate, passwordCreate
            };
            console.log("entra");
           
            try {
                const response = await axios.post("http://localhost:5000/api/users/login", Usuario);
    
                navigate(`/Home/`);
                console.log(response);
                alert('entro correctamene')
              } catch (error) {
                console.log(error);
                alert('error al entrar')
    
              }
            };

  return (
    <form id='formLogin'  onSubmit={(e) => onSubmitLogin(e)}>
            <h2>Inicia Sesión</h2>
            <FormGroup onChange={(e) => getInput(e)} contLabel="Correo" place="Correo" nameInput="emailCreate" inputType="email"/>
            <FormGroup onChange={(e) => getInput(e)} contLabel="Contraseña" place="Contraseña" nameInput="passwordCreate" inputType="password"/>
            
           <button id='btnLogin' type='submit'>Iniciar Sesion</button>
        </form>
  )
}