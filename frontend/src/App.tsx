
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout';
function App() {


  return (
   <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path = '/dashboard' element={<Layout/>}/>
    </Routes>
   </>
  );
}

export default App;
