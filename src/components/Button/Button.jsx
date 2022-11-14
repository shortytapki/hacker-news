import GradientText from '../GradientText/GradientText';
import styles from './Button.module.css';

const Button = ({ handler, children }) => {
  return (
    <div className={styles.buttonwrap}>
      <button className={styles.button} onClick={() => handler()}>
        <GradientText>{children}</GradientText>
      </button>
    </div>
  );
};

export default Button;
