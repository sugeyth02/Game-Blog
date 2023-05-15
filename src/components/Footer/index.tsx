import styles from './Footer.module.scss';
export default function Footer() {
  return (
    <div className={styles.container}>
      <p className={styles.container__reserved}>
        © GameBlog. Games are property of their respective owners. Applaudo of
        America Inc. San Salvador, El Salvador, CA
      </p>
      <div className={styles.container__info}>
        <a
          className={styles.info__link}
          href='https://www.applaudostudios.com/contact'
        >
          Contact Us
        </a>
        <i className={`fa-solid fa-gamepad ${styles.info__icon}`}></i>
      </div>
    </div>
  );
}
