import GradientText from '../GradientText/GradientText';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <p className={styles.msg}>
      <GradientText>Loading posts...</GradientText>
    </p>
  );
};

export default Loading;
