import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className={styles.container}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
