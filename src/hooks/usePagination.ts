import { useReducer, useMemo, useCallback, useEffect, useRef } from 'react';
import usePrevious from './usePrevious';

interface IState {
  current: number;
}
type TAction =
  | { type: 'backward' }
  | { type: 'forward' }
  | { type: 'set'; payload: number };

function reducer(state: IState, action: TAction) {
  switch (action.type) {
    case 'backward':
      return { current: state.current - 1 };
    case 'forward':
      return { current: state.current + 1 };
    case 'set':
      return { current: action.payload };
    default:
      throw new Error();
  }
}

export default function usePagination(
  games: number,
  gamesPerPage: number,
  page: number
) {
  const [currentPage, dispatch] = useReducer(reducer, { current: page });
  const previous = useRef<number>();
  const previousPage = usePrevious(currentPage.current);

  useEffect(() => {
    if (previousPage !== currentPage.current) {
      previous.current = previousPage;
    }
  });

  const indexOfFirstPost = useMemo(() => {
    const indexOfFirstPost = (currentPage.current - 1) * gamesPerPage;
    return indexOfFirstPost;
  }, [currentPage, gamesPerPage]);

  const pageNumbers = useMemo(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(games / gamesPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }, [games, gamesPerPage]);

  const forwardLogic = useCallback(() => {
    if (currentPage.current < pageNumbers.length) {
      dispatch({ type: 'forward' });
    }
  }, [currentPage, pageNumbers]);

  const backwardLogic = useCallback(() => {
    if (currentPage.current > 1) {
      dispatch({ type: 'backward' });
    }
  }, [currentPage]);

  const setCurrentPage = useCallback((value: number) => {
    dispatch({ type: 'set', payload: value });
  }, []);

  return {
    currentPage: currentPage.current,
    setCurrentPage,
    indexOfFirstPost,
    pageNumbers,
    forwardLogic,
    backwardLogic,
    previous,
  };
}
