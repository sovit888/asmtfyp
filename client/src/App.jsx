import { Route, Routes } from 'react-router-dom';
import { Filter, Friend, NavBar } from './Components/index';
import AllUser from './pages/AllUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Routes>
        <Route
          path=""
          element={
            <>
              <Filter />
              <Friend />
            </>
          }
        />
        <Route path="allusers" element={<AllUser />} />
      </Routes>
    </>
  );
}

export default App;
