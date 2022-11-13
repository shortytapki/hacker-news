import GradientText from '../GradientText/GradientText';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.container}>
      <p className={styles.msg}>
        <GradientText>Loading posts...</GradientText>
      </p>
    </div>
  );
};

export default Loading;
