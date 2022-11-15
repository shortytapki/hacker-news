import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Button from '../Button/Button';
import GradientText from '../GradientText/GradientText';
import styles from './Comment.module.css';
import { useGetKidsQuery } from '../../store/posts/posts.api';

const Comment = ({ comment, root }) => {
  const { putToddlers, putRootComments } = useActions();

  const {
    data: rootCommentsData,
    isLoading,
    isFetching,
    refetch,
  } = useGetKidsQuery(root);
  const rootCommentsLoaded = !isLoading && !isFetching;
  useEffect(() => {
    rootCommentsLoaded && putRootComments(rootCommentsData);
  }, [rootCommentsLoaded]);

  const refresh = isLoading || isFetching;
  const rootComments = useSelector((state) => state.views.rootComments);

  console.log(rootComments);

  const [skip, setSkip] = useState(true);

  const {
    data,
    isLoading: commentsAreLoading,
    isFetching: commentsAreFetching,
    isError: commentsLoadError,
  } = useGetKidsQuery('', { skip: skip });
  const commentsLoaded =
    !commentsAreFetching && !commentsAreLoading && !commentsLoadError;

  useEffect(() => {
    if (commentsLoaded && data) {
      data.at(0) && putToddlers(data);
    }
  }, [commentsLoaded]);

  const toddlers = useSelector((state) => state.views.toddlers);

  const comments = rootComments.length && rootComments.at(0) !== null;
  return (
    <article>
      <div className={styles.refresh}>
        <Button handler={refetch}>Refresh comments</Button>
        <h2>
          {(refresh && 'Loading...') ||
            (comments && !refresh
              ? `Comments: ${rootComments.length}`
              : 'No comments yet... (-_-メ)')}
        </h2>
      </div>
      {!isLoading &&
        !isFetching &&
        rootComments.map(
          (comment) =>
            comment !== null && (
              <div key={comment.id} className="wrap">
                <div className={styles.blackwrap}>
                  <header className={styles.header}>
                    <p>
                      <GradientText>
                        {comment.by}
                        <br /> at{' '}
                        {new Date(comment.time * 1000).toLocaleString()}
                      </GradientText>
                    </p>
                  </header>
                  <section
                    className={styles.comment}
                    dangerouslySetInnerHTML={{ __html: comment.text }}
                  ></section>
                </div>
              </div>
            )
        )}
    </article>
  );
};

export default Comment;
