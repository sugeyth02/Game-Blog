import { useEffect } from 'react';
import usePagination from '../../hooks/usePagination';
import styles from './Pagination.module.scss';

interface IProps {
  gamesPerPage: number;
  setPage: (page: number) => void;
  page: number;
  games: number;
  onPageChanged: (start: number) => void;
}

export default function Pagination({
  gamesPerPage,
  games,
  onPageChanged,
  setPage,
  page,
}: IProps) {
  const {
    currentPage,
    setCurrentPage,
    backwardLogic,
    forwardLogic,
    indexOfFirstPost,
    pageNumbers,
    previous,
  } = usePagination(games, gamesPerPage, page);

  useEffect(() => {
    onPageChanged(indexOfFirstPost);
    setPage(currentPage);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [indexOfFirstPost, onPageChanged, currentPage, setPage]);

  useEffect(() => {
    if (pageNumbers.length) {
      if (page <= pageNumbers.length) {
        setCurrentPage(page);
      } else {
        setCurrentPage(1);
      }
    }
  }, [page, setCurrentPage, pageNumbers]);

  return (
    <div className={styles.container}>
      <button
        className={styles.container__button}
        onClick={() => backwardLogic()}
        disabled={currentPage === 1 ? true : false}
      >
        <i className='fa-solid fa-angle-left'></i>
      </button>
      <div className={styles.numbers}>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`${styles.container__button} ${
              currentPage === number ? styles.currentPage : ''
            }`}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={styles.container__button}
          onClick={() => setCurrentPage(previous.current!)}
          disabled={previous?.current === undefined ? true : false}
        >
          <i className='fa-solid fa-arrow-rotate-right'></i>
        </button>
      </div>
      <button
        className={styles.container__button}
        onClick={() => forwardLogic()}
        disabled={currentPage === pageNumbers.length ? true : false}
      >
        <i className='fa-solid fa-angle-right'></i>
      </button>
    </div>
  );
}
