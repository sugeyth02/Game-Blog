import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import GameCard from '../../components/GameCard';
import { Fetch } from '../../service/fetch.js';
import styles from './HomePage.module.scss';
import { shortGameInfo } from '../../utils/objectTransformer';
import Pagination from '../../components/Pagination';
import { IGame } from './../../types/IGame';

export default function HomePage() {
  const limit = 8;
  const [data, setData] = useState<Array<IGame> | null>(null);
  const [totalGames, setTotalGames] = useState<number>(0);
  const [firstGame, setFirstGame] = useState<null | number>(null);
  const [search, setSearch] = useSearchParams();
  const [pageQuery, searchQuery] = [search.get('page'), search.get('search')];
  
  const setter = useCallback(
    (page: number) => {
      if (searchQuery) {
        setSearch({
          page: `${page}`,
          search: `${searchQuery}`,
        });
      } else {
        setSearch({
          page: `${page}`,
        });
      }
    },
    [searchQuery, setSearch]
  );

  useEffect(() => {
    const getData = async () => {
      try {
        if (searchQuery !== null) {
          const games:IGame[]= await Fetch.getInstance().get(
            `games?name_contains=${searchQuery}`
          );
          setTotalGames(games.length);
          const gamesPaginated = games.slice(
            firstGame!,
            Number(firstGame) + limit
          );
          setData(gamesPaginated);
        } else {
          const games:number = await Fetch.getInstance().get('games/count');
          setTotalGames(games);
          const gamesPaginated:IGame[] = await Fetch.getInstance().get(
            `games?_start=${firstGame}&_limit=${limit}`
          );
          setData(gamesPaginated);
        }
      } catch (err) {
        //TODO
      }
    };
    if (firstGame !== null) getData();
  }, [firstGame, searchQuery]);

  return (
    <div className={styles.gameCards}>
      <h1 className={styles.gameCards__title}>Our games</h1>
      <p className={styles.gameCards__items}>{totalGames}</p>
      <div className={styles.gameCards__container}>
        {data !== null &&
          data.map((game) => (
            <GameCard key={game.id} game={shortGameInfo(game)} />
          ))}
      </div>
      <Pagination
        page={Number(pageQuery) || 1}
        gamesPerPage={limit}
        games={totalGames}
        onPageChanged={setFirstGame}
        setPage={setter}
      />
    </div>
  );
}
