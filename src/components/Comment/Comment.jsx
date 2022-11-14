import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useGetCommentsQuery } from '../../store/posts/posts.api';
import Button from '../Button/Button';
import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';

const Comment = ({ comment, reply }) => {
  const [skip, setSkip] = useState(true);
  const { by: author, text, time, id, kids } = comment;
  const { putNewReplies } = useActions();

  console.log(kids);
  // const replyId = (kids.length !== 0 && kids.at(0)) || id;
  const {
    data: replies,
    isError,
    isLoading,
    isFetching,
  } = useGetCommentsQuery(id, { skip: skip });

  useEffect(() => {
    if (kids) {
      putNewReplies({
        root: id,
        kids: kids,
      });
    }
  }, [replies]);

  const date = new Date(time * 1000).toLocaleString();

  return (
    <article
      className={reply ? '' : 'commentwrap'}
      onClick={() => setSkip((prev) => !prev)}
    >
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
        {replies && (
          <section className={styles.replies}>
            <h2>Replies:</h2>
            {replies.map(
              (reply) =>
                reply !== null && (
                  <Comment key={comment.time} comment={comment} reply />
                )
            )}
          </section>
        )}
      </div>
    </article>
  );
};

export default Comment;
