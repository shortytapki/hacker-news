import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';
const CommentBody = ({ commentData }) => {
  return (
    <>
      <header className={styles.header}>
        <p>
          <GradientText>
            {commentData.by}
            <br /> at {new Date(commentData.time * 1000).toLocaleString()}
          </GradientText>
        </p>{' '}
      </header>
      <section
        className={styles.comment}
        dangerouslySetInnerHTML={{
          __html: commentData.text.replace(
            '<a',
            `<a target="_blank"
          rel="noopener noreferrer" class="link"`
          ),
        }}
      ></section>
    </>
  );
};

export default CommentBody;
