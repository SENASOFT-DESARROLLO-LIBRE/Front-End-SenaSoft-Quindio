import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormGroup } from '../FormGroup/Formgroup';


export const FormRecover = () => {
  
const navigate = useNavigate();


const [inputs, setInputs] = useState({
  emailCreate: "", 
});

const { emailCreate } = inputs;

const onChange = (e) => {
  setInputs({...inputs, [e.target.name]: e.target.value})
};

const onSubmit = async(e) => {
  e.preventDefault()
  const Usuario = {
    emailCreate
  };
  // setLoading(true)
  try{
    const response = await axios.patch("http://localhost:5000/api/users/recoverPassword", Usuario)
    console.log(response.data);
    // accountCreate()
    alert("Contraseña recuperada")
    navigate('/')

  }catch{
    alert("error")
  }
}

  return (
    <form onSubmit={(e) => onSubmit(e)} id='formRecover' action="">
        <h2>¿Olvidaste Tu Contraseña?</h2>
        <p className='pRecover'>No te preocupes, digita tu correo y haremos lo posible por recuperarla</p>
        <div className="contGroup">
            <FormGroup onChange={(e) => onChange(e)} nameInput="emailCreate"  contLabel="Correo" place="Correo" inputType="email"/>
        </div>
        <button id='btnRecover' type='submit' >Enviar</button>
    </form>
  )

}
