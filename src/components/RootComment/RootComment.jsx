import GradientText from '../GradientText/GradientText';
import styles from './RootComment.module.css';

const RootComment = ({ comment }) => {
  const { by: author, text, time } = comment;
  const date = new Date(time * 1000).toLocaleString();

  return (
    <article className="commentwrap">
      <div className={styles.blackwrap}>
        <header className={styles.header}>
          <p>
            <GradientText>
              {author}
              <br /> at {date}
            </GradientText>
          </p>
        </header>
        <section
          className={styles.comment}
          dangerouslySetInnerHTML={{ __html: text }}
        ></section>
      </div>
    </article>
  );
};

export default RootComment;
