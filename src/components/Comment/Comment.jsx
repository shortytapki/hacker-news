import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { useGetKidsQuery } from '../../store/posts/posts.api';
import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';

const Comment = ({ id, comment }) => {
  // const { isLoading, isFetching, isSuccess, data } = useGetKidsQuery(id);
  // const { putComments } = useActions();
  // useEffect(() => {
  //   !isLoading && !isFetching && isSuccess && putComments(data);
  // }, [data]);
  // const rootComments = useSelector((state) => state.views.rootComments);
  let body;
  if (comment !== undefined || comment !== null) {
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
  }
  return (
    <div className="commentwrap">
      <div className={styles.blackwrap}>{body}</div>
    </div>
  );
};

export default Comment;
