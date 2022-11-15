import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useGetCommentQuery } from '../../store/posts/posts.api';
import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';

const Comment = ({ id, comment, skip }) => {
  const { isLoading, isFetching, isSuccess, data, isError } =
    useGetCommentQuery(id, {
      skip: skip,
    });
  const { putBody } = useActions();
  const loaded = !isLoading && !isFetching && isSuccess;
  useEffect(() => {
    loaded && putBody(data);
  }, [loaded]);
  const nestedBody = useSelector((state) => state.views.nestedBody);
  let body;
  if (!isSuccess && !loaded && !comment) body = <></>;
  if (comment !== undefined && comment !== null) {
    body = (
      <>
        <header className={styles.header}>
          <p>
            <GradientText>
              {comment.by}
              <br /> at {new Date(comment.time * 1000).toLocaleString()}
            </GradientText>
          </p>
        </header>
        <section
          className={styles.comment}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        ></section>
      </>
    );
  } else {
    body = (
      <>
        <header className={styles.header}>
          <p>
            <GradientText>
              {nestedBody.by}
              <br /> at {new Date(nestedBody.time * 1000).toLocaleString()}
            </GradientText>
          </p>
        </header>
        <section
          className={styles.comment}
          dangerouslySetInnerHTML={{ __html: nestedBody.text }}
        ></section>
      </>
    );
  }
  return (
    <div className="commentwrap">
      <div className={styles.blackwrap}>{body}</div>
    </div>
  );
};

export default Comment;
