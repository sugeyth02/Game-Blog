import styles from './Comment.module.scss';

interface IComment {
  user: string;
  body: string;
  date: string;
}
interface IProps {
  comment: IComment;
}
export default function Comment({ comment }: IProps) {
  const { user, body, date } = comment;
  return (
    <div className={styles.container}>
      <i className={`fa-solid fa-user ${styles.container__user}`}></i>
      <div className={styles.container__comment}>
        <p className={styles.comment__user}>{user}</p>
        <p className={styles.comment__content}>{body}</p>
        <p className={styles.comment__date}>{date}</p>
      </div>
    </div>
  );
}
