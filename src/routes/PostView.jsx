import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetCommentsQuery } from '../store/posts/posts.api';
import Comment from '../components/Comment/Comment';
import Button from '../components/Button/Button';
import { useEffect } from 'react';
import { useActions } from '../hooks/useActions';

const PostView = () => {
  let history = useHistory();
  const returnHandler = () => {
    history.push('/');
  };
  const { id } = useParams();
  const { putNewComments } = useActions();
  const {
    data,
    isLoading: commentsAreLoading,
    isFetching: commentsAreFetching,
    isError: commentsLoadError,
    refetch,
  } = useGetCommentsQuery('8863');
  const commentsLoaded =
    !commentsAreFetching && !commentsAreLoading && !commentsLoadError;
  let rootComments = commentsLoaded && data;

  useEffect(() => {
    if (commentsLoaded) {
      putNewComments(rootComments);
    }
  }, [data]);

  let firstLvlComments = useSelector((state) => state.views.rootComments);

  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);
  const { url, title, time, by: author } = post;

  return (
    <>
      <Header>
        <Button handler={returnHandler}>Go home</Button>
      </Header>
      <div className={styles.view}>
        <div className="viewwrap">
          <article className={styles.article}>
            <header className={styles.header}>
              <div>
                <h1 className={styles.title}>{title}</h1>
                <a
                  href={url}
                  className={styles.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Go to the original post
                </a>
                <div className={styles.refresh}>
                  <Button handler={refetch}>Refresh comments</Button>
                </div>
              </div>
              <aside className={styles.author}>
                <p>
                  <GradientText>
                    by {author}
                    <br />
                    at {new Date(time * 1000).toLocaleString()}
                  </GradientText>
                </p>
              </aside>
            </header>
            <section className={styles.comments}>
              {(commentsAreLoading || commentsAreFetching) && firstLvlComments
                ? 'Loading comments'
                : 'No comments yet... (-_-メ)'}
              {firstLvlComments.length !== 0 &&
                firstLvlComments.map(
                  (comment) =>
                    comment !== null &&
                    !comment.msg && (
                      <Comment key={comment.time} comment={comment} />
                    )
                )}
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
