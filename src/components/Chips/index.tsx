import styles from './Chips.module.scss';

interface IProps {
  type: string;
  text: string;
}
const Chips = ({ type, text }: IProps) => {
  return <span className={`${styles.container} ${styles[type]}`}>{text}</span>;
};
export default Chips;
