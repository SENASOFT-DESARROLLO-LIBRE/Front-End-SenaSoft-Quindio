import { Route, Routes } from 'react-router-dom';
import { Home } from './Components/Pages/Home/Home';
import { Login } from './Components/Pages/Login/Login';
import { ConfirmAccount } from './Components/Pages/ConfirmAccount/ConfirmAccount';
import { RecoverPassword } from './Components/Pages/RecoverPassword/RecoverPassword';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/ConfirmAccount' element={<ConfirmAccount/>}></Route>
        <Route path='/RecoverPassword' element={<RecoverPassword/>}></Route>
        <Route path="*" element="Not Found"></Route>
      </Routes>
    </div>
  );
}
export default App;
