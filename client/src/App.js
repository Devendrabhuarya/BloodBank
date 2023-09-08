import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index.js';
import Login from './pages/Login';
import Register from './pages/Register/index.js';
import ProtectedPage from './component/ProtectedPage';
import Loaders from './component/Loaders';
import { useSelector } from 'react-redux';
import Profile from './pages/profile/index';
function App() {
  const { loader } = useSelector((state) => state.loader);
  return (
    <div>
      {loader && <Loaders />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedPage><Home /></ProtectedPage>} />
          <Route path='/profile' element={<ProtectedPage><Profile /></ProtectedPage>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
