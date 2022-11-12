import styles from './GradientText.module.css';

const GradientText = ({ children }) => {
  return <span className={styles.gradient}>{children}</span>;
};

export default GradientText;
