import React, { useState } from 'react'
import { FormGroup } from '../../UI/FormGroup/Formgroup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export const MainLogin = () => {

    // Use Navigate para navegar entre las rutas
    const navigate = useNavigate()


    // Modulo Inicio de sesión
    const [inputs, setInputs] =useState({
        email: "",
        password: ""
    });
    const { email, password } = inputs;

    const getInput = (e) =>{
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const onSubmitLogin = async(typerole) => {

        const Usuario = {
          email, password
        };
       
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", Usuario);
            // const response = await axios.post("https://backend-space-parking.onrender.com/api/users/login", Usuario);
           
            navigate(`/Home`);
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        };


    // Modulo crear cuenta
    const [inputsCreate, setInputsCreate] = useState({
        name: '',
        emailCreate: '',
        passwordCreate: '',
    })

    const {name, emailCreate, passwordCreate, confirmPassword} = inputsCreate

    const onSaveData = (e) => {
        setInputsCreate({ ...inputs, [e.target.name]: e.target.value });
      };


    const sendData = async (e) => {
        e.preventDefault();

        const User = {
            name,
            emailCreate,
            passwordCreate,
        }


        const confirmPassword = inputsCreate.confirmPassword;
        if (passwordCreate !== confirmPassword) {
            alert('Contraseña y confirmacion de contraseña no coinciden')
            return;
        }
        else{
            sendUserData(User)
        }
        
    }






  return (
    <main id='mainLogin'>
        <form id='formLogin' onSubmit={onSubmitLogin}>
            <FormGroup onChange={(e) => getInput(e)} contLabel="Correo" place="Correo" nameInput="email" inputType="email"/>
            <FormGroup onChange={(e) => getInput(e)} contLabel="Contraseña" place="Contraseña" nameInput="password" inputType="password"/>
            
           <button id='btnLogin' type='submit'>Iniciar Sesion</button>
        </form>



        <form id='formCreate' onSubmit={sendData}>
            <FormGroup onChange={onSaveData} contLabel="Nombre" place="Nombre" nameInput="name" inputType="Text"/>
            <FormGroup onChange={onSaveData} contLabel="Correo" place="Correo" nameInput="email" inputType="email"/>
            <FormGroup onChange={onSaveData} contLabel="Contraseña" place="Contraseña" nameInput="password" inputType="password"/>
            <FormGroup onChange={onSaveData} nameInput="confirmPassword" contLabel="Confirmar Contraseña" place="Contraseña" inputType="password" />
            
            
           <button id='btnCreateAccount' type='submit'>Crear Cuenta</button>
        </form>


        
    </main>
  )
}
