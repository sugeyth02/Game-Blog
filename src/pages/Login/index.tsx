import { useState, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fetch } from '../../service/fetch.js';
import styles from './Login.module.scss';
import { Paths } from './../../types/Paths';
import { IUser } from '../../types/IUser.js';
const { HOME } = Paths;

export default function Login() {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const logIn = useCallback(
    async (userName, password) => {
      try {
        const body = {
          identifier: userName,
          password: password,
        };
        const response: IUser = await Fetch.getInstance().post(
          body,
          'auth/local'
        );
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('userName', response.user.username);
        navigate(-1);
      } catch (e) {
        setError('Wrong credentials!');
      }
    },
    [navigate]
  );

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await logIn(userName, password);
  };

  return (
    <div className={styles.container}>
      <div className={styles.container__center}>
        <div
          className={styles.container__image}
          style={{
            backgroundImage:
              'url(https://gifimage.net/wp-content/uploads/2018/11/gif-controller.gif)',
          }}
        ></div>
        <div className={styles.container__form}>
          <button
            className={styles.container__exit}
            onClick={() => navigate(HOME)}
          >
            <i className='fa-solid fa-x'></i>
          </button>
          <form onSubmit={(e) => handleOnSubmit(e)} className={styles.form}>
            <div className='input__container'>
              <label className={styles.form__label} htmlFor='userName'>
                Username
              </label>
              <input
                className={styles.form__input}
                type='text'
                placeholder='Write your username'
                name='userName'
                required
                onChange={(e) => {
                  setError('');
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className='input__container'>
              <label className={styles.form__label} htmlFor='password'>
                Password
              </label>
              <input
                className={styles.form__input}
                type='password'
                placeholder='Insert your password'
                name='password'
                required
                onChange={(e) => {
                  setError('');
                  setPassword(e.target.value);
                }}
              />
            </div>
            <span className={styles.form__error}>{error}</span>
            <button className={styles.form__submit} type='submit'>
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
