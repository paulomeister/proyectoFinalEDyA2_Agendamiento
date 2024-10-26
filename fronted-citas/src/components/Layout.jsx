import Navbar from './Navbar';  // Importa el componente Navbar
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <Navbar /> 
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
