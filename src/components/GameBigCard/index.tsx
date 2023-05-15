import { memo } from 'react';
import Chips from '../Chips';
import styles from './GameBigCard.module.scss';

interface IChip {
  id: number;
  name: string;
  [key: string]: any;
}

interface IGame {
  image: string;
  title: string;
  releaseYear: number;
  gender: string;
  publishers: Array<IChip>;
  platforms: Array<IChip>;
  price: string;
}
interface IProps {
  game: IGame;
}

const GameBigCard = memo(({ game }: IProps) => {
  let { image, title, releaseYear, gender, publishers, platforms, price } =
    game;

  return (
    <div className={styles.container}>
      <div
        style={{
          backgroundImage: `url(${image})`,
        }}
        className={styles.container__image}
      ></div>
      <div className={styles.container__info}>
        <h1 className={styles.info__title}>{title}</h1>
        <div className={styles.info__generalities}>
          <p className={styles.info__realiseYear}>
            <span>Release year: </span>
            {releaseYear}
          </p>
          <p className={styles.info__gender}>
            <span>Gender: </span>
            {gender}
          </p>
          <div className={styles.info__publisher}>
            <span>Publishers</span>
            <div className={styles.publishers}>
              {publishers.map((e) => (
                <Chips text={e.name} type='publishers' key={e.id} />
              ))}
            </div>
          </div>
          <div className={styles.info__platforms}>
            <span>Platforms</span>
            <div className={styles.platforms}>
              {platforms.map((e) => (
                <Chips text={e.name} type='platforms' key={e.id} />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.info__footer}>
          <p className={styles.footer__price}>{price}</p>
          <i className={`fa-solid fa-heart ${styles.footer__liker}`}></i>
        </div>
      </div>
    </div>
  );
});
export default GameBigCard;
