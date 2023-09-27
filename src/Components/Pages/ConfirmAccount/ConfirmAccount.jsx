import React from 'react'
import { useNavigate } from 'react-router-dom'


export const ConfirmAccount = () => {
    const navigate = useNavigate()
    const toLogin = () =>{
        navigate(`/`);
    }
  return (
    <div id='mainConfirm'>
        <h1>Hola, has activado tu cuenta correctamente</h1>
        <button id='btnConfirm' onClick={toLogin}>Volver al Inicio de Sesión</button>
    </div>
  )
}
