import GradientText from '../GradientText/GradientText';
import styles from './Button.module.css';

const Button = ({ page, handler }) => {
  return (
    <div className={styles.buttonwrap}>
      <button className={styles.button} onClick={() => handler()}>
        <GradientText>{page === 'home' ? 'refresh' : 'go home'}</GradientText>
      </button>
    </div>
  );
};

export default Button;
