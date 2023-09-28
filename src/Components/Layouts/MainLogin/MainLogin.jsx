import React, { useState } from 'react'
import { FormGroup } from '../../UI/FormGroup/Formgroup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormLogin } from '../FormLogin/FormLogin';

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

    const onSubmitLogin = async(e) => {
        e.preventDefault()

        const Usuario = {
          email, password
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


    // Modulo crear cuenta
    const [inputsCreate, setInputsCreate] = useState({
        name: '',
        emailCreate: '',
        passwordCreate: '',
    })

    const {name, emailCreate, passwordCreate, confirmPassword} = inputsCreate

    const onSaveData = (e) => {
        setInputsCreate({ ...inputsCreate, [e.target.name]: e.target.value });
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
            console.log(passwordCreate);
            console.log(confirmPassword);
            return;
        }
        else{
            sendUserData(User)
        }
    }
    const sendUserData = (userData) => {
        alert('cuenta creada')
        console.log(userData);
        return axios.post('http://localhost:5000/api/users/registerUser', userData);
      };



  return (
    <main id='mainLogin'>
        <FormLogin/>
        



        <form id='formCreate' onSubmit={sendData}>
          <h2>Crea Tu Cuenta</h2>
            <FormGroup onChange={(e) => onSaveData(e)} contLabel="Nombre" place="Nombre" nameInput="name" inputType="Text"/>
            <FormGroup onChange={(e) => onSaveData(e)} contLabel="Correo" place="Correo" nameInput="emailCreate" inputType="email"/>
            <FormGroup onChange={(e) => onSaveData(e)} contLabel="Contraseña" place="Contraseña" nameInput="passwordCreate" inputType="password"/>
            <FormGroup onChange={(e) => onSaveData(e)} nameInput="confirmPassword" contLabel="Confirmar Contraseña" place=" ConfirmarContraseña" inputType="password" />
            
            
           <button id='btnCreateAccount' type='submit'>Crear Cuenta</button>
        </form>


        
    </main>
  )
}
