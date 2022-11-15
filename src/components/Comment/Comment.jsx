import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Button from '../Button/Button';
import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';
import { useGetKidsQuery } from '../../store/posts/posts.api';

const Comment = ({ comment, parent }) => {
  const { putToddlers } = useActions();

  const [skip, setSkip] = useState(true);

  const {
    data,
    isLoading: repliesAreLoading,
    isFetching: repliesAreFetching,
    isError: repliesLoadError,
    isSuccess,
  } = useGetKidsQuery(parent, { skip: skip });

  console.log(data);

  useEffect(() => {
    isSuccess && putToddlers(data);
  }, [isSuccess, skip]);

  // const commentsLoaded =
  //   !commentsAreFetching && !commentsAreLoading && !commentsLoadError;
  // useEffect(() => {
  //   if (commentsLoaded && data) {
  //     data.at(0) && putToddlers(data);
  //   }
  // }, [commentsLoaded]);

  const toddlers = useSelector((state) => state.views.toddlers);
  console.log(toddlers);

  // const comments = rootComments.length && rootComments.at(0) !== null;
  return (
    <div
      className="commentwrap"
      onClick={() => {
        setSkip(false);
      }}
    >
      <div className={styles.blackwrap}>
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
        {toddlers.at(0) !== null &&
          toddlers.map((tdl) => (
            <Comment comment={comment} key={comment.time} parent={comment.id} />
          ))}
        {/* {!skip && <Comment comment={}/>} */}
      </div>
    </div>
  );
};

export default Comment;
