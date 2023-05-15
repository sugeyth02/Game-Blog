import styles from './GameCard.module.scss';
import { useNavigate } from 'react-router-dom';

interface IGame {
  id: number;
  image: string;
  imageName: string;
  title: string;
  releaseYear: number;
  price: string;
}

interface IProps {
  game: IGame;
}

export default function GameCard({ game }: IProps) {
  const { id, image, imageName, title, releaseYear, price } = game;
  const navigate = useNavigate();
  return (
    <div
      className={styles.gameCard}
      onClick={() => {
        navigate('games/' + id);
      }}
    >
      <img src={image} alt={imageName} className={styles.gameCard__image} />
      <div className={styles.gameCard__info}>
        <h1 className={styles.info__title}>{title}</h1>
        <p className={styles.info__realiseYear}>{releaseYear}</p>
        <p className={styles.info__price}>{price}</p>
      </div>
    </div>
  );
}
