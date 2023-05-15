import styles from './LoggedUser.module.scss';

interface IProps {
  name: string | null;
  setLogged: (logged: boolean) => void;
}

export default function LoggedUser({ name, setLogged }: IProps) {
  function handledLogged() {
    localStorage.clear();
    setLogged(false);
  }
  return (
    <div className={styles.content__user}>
      <div className={styles.user}>
        <i className={`fa-solid fa-user ${styles.user__icon}`}></i>
        <p className={styles.user__name}>{name}</p>
      </div>
      <button
        className={styles.content__logout}
        onClick={() => handledLogged()}
      >
        <i
          className={`fa-solid fa-arrow-right-from-bracket ${styles.userLogout}`}
        ></i>
      </button>
    </div>
  );
}
