import GradientText from '../GradientText/GradientText';
import styles from './Button.module.css';

const Button = ({ children }) => {
  return (
    <div className={styles.wrap}>
      <button className={styles.button}>
        <GradientText>{children}</GradientText>
      </button>
    </div>
  );
};

export default Button;
