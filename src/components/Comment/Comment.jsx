import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';

import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';
import { useGetKidsQuery } from '../../store/posts/posts.api';

const Comment = ({ comment }) => {
  const { by: author, text, time, id, kids } = comment;
  const [skip, setSkip] = useState(true);
  const { putToddlers } = useActions();

  const {
    data,
    isLoading: commentsAreLoading,
    isFetching: commentsAreFetching,
    isError: commentsLoadError,
    refetch,
  } = useGetKidsQuery(id, { skip: skip });
  const commentsLoaded =
    !commentsAreFetching && !commentsAreLoading && !commentsLoadError;

  useEffect(() => {
    if (commentsLoaded && data) {
      data.at(0) && putToddlers(data);
    }
  }, [commentsLoaded]);

  const toddlers = useSelector((state) => state.views.toddlers);
  console.log(toddlers);
  const date = new Date(time * 1000).toLocaleString();

  return (
    <article
      className="commentwrap"
      onClick={() => {
        setSkip((prev) => !prev);
      }}
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
      </div>
    </article>
  );
};

export default Comment;
