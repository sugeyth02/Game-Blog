import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss';
import LoggedUser from '../LoggedUser';
import useAuth from '../../hooks/useAuth';
import { Paths } from './../../types/Paths';
const { HOME, LOGIN } = Paths;

export default function NavBar() {
  const [logged, setLogged] = useState<boolean>(false);
  const { token, userName } = useAuth();

  useEffect(() => {
    setLogged(token !== null ? true : false);
  }, [token]);

  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navBar__header}>
          <p className={styles.header_title}>srd02</p>
        </div>
        <div className={styles.navBar__content}>
          <Link className={styles.content__home} to={HOME}>
            <i className={`fa-solid fa-gamepad ${styles.content__icon}`}></i>
            <p className={styles.content__title}>GameBlog</p>
          </Link>
          {logged ? (
            <LoggedUser name={userName} setLogged={setLogged} />
          ) : (
            <Link className={styles.content__logIn} to={LOGIN}>
              LogIn
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
