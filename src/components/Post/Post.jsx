import GradientText from '../GradientText/GradientText';
import styles from './Post.module.css';

const Post = ({ number, children }) => {
  const { by, time, title } = children;
  const createdAt = new Date(time * 1000).toLocaleString().slice(0, 17);
  return (
    <div className={styles.wrap}>
      <div className={styles.post}>
        <p className={styles.number}>
          <GradientText>{number}</GradientText>
        </p>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <GradientText>{title}</GradientText>
          </h2>
          <div className={styles.info}>
            Posted by <GradientText>{by} </GradientText>
            at {createdAt}
          </div>
        </header>
      </div>
    </div>
  );
};

export default Post;
