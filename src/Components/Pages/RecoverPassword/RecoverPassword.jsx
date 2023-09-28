import React from 'react'
import styles from "../RecoverPassword/RecoverPassword.css"
import { FormRecover } from '../../UI/FormRecover/FormRecover';
// import { Img } from '../../UI/Img/Img';

export const RecoverPassword = () => {
//   console.log(styles);
  return (
    <main id='mainRecover'>
      <div className="containerLogo">
      </div>
      <div className="contPassword">
      {/* <Img styleImg="ImgRecover" url="https://res.cloudinary.com/miguelgo205/image/upload/v1682230467/SpaceParking/Forgot_password-bro_wjmfb8.png"/> */}
      <FormRecover/>
      </div>
    </main>
  )
}