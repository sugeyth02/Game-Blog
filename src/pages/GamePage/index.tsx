import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './GamePage.module.scss';
import GameBigCard from '../../components/GameBigCard';
import Comment from '../../components/Comment';
import { Fetch } from '../../service/fetch.js';
import CommentInput from '../../components/CommentInput';
import { comments, bigGameInfo } from '../../utils/objectTransformer';
import { sortByDate } from '../../utils/helper';
import { IGame } from './../../types/IGame';
import { IComment } from '../../types/IComment';
import useAuth from '../../hooks/useAuth';

export default function GamePage() {
  const [data, setData] = useState<IGame | null>(null);
  const [commentsData, setCommentsData] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loadingComments, setLoadingComments] = useState(true);
  const [loadingGame, setLoadingGame] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingGame(true);
        const response:IGame = await Fetch.getInstance().get(`games/${id}`);
        setData(response);
        setLoadingGame(false);
      } catch (err) {
        setData(null);
        setLoadingGame(true);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoadingComments(true);
        const response: IComment[] = await Fetch.getInstance().get(
          `games/${id}/comments?_limit=-1`
        );
        setCommentsData(sortByDate(response));
        setLoadingComments(false);
      } catch (err) {
        setCommentsData([]);
        setLoadingComments(true);
      }
    };
    if (newComment === '') getData();
  }, [id, newComment]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (token === null) {
          throw new Error();
        }
        await Fetch.getInstance().postWithAuth(
          newComment,
          token,
          `games/${id}/comment`
        );
        setNewComment('');
      } catch (err) {
        setError('You must login first');
      }
    };
    if (newComment !== '') getData();
  }, [id, newComment, token]);

  return (
    <div className={styles.container}>
      <div className='container__card'>
        {loadingGame === false && (
          <button
            className={styles.container__back}
            onClick={() => navigate(-1)}
          >
            <i className='fa-solid fa-angle-left'></i>
          </button>
        )}
        {loadingGame === false && data !== null && (
          <GameBigCard game={bigGameInfo(data)} />
        )}
      </div>

      {loadingComments === false && (
        <div className='container__comments'>
          <h1 className={styles.container__title}>Comments</h1>
          <span className={styles.error}>{error}</span>
          <CommentInput postComment={setNewComment} />
          {commentsData.map((comment) => (
            <Comment comment={comments(comment)} key={comment.id} />
          ))}
        </div>
      )}
    </div>
  );
}
