import { useState, useRef, useEffect } from 'react';
import styles from './CommentInput.module.scss';

interface IProps {
  postComment: (value: string) => void;
}

export default function CommentInput({ postComment }: IProps) {
  const [value, setValue] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef?.current) {
      buttonRef.current.disabled = value.trim() ? false : true;
    }
  }, [value]);

  function commentLogic() {
    postComment(value);
    setValue('');
  }

  return (
    <div className={styles.container}>
      <div className={styles.container__user}>
        <i className={`fa-solid fa-user ${styles.user__icon}`}></i>
        <label className={styles.user__label} htmlFor='commentBody'>
          Author
        </label>
        <textarea
          value={value}
          name='commentBody'
          className={styles.user__input}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></textarea>
      </div>
      <button
        ref={buttonRef}
        className={styles.container__comment}
        onClick={() => commentLogic()}
      >
        COMMENT
      </button>
    </div>
  );
}
