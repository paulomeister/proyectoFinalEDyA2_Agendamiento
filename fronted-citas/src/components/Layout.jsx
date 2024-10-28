import Navbar from './Navbar';  // Importa el componente Navbar
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <main className='container-xl mx-auto p-10'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
