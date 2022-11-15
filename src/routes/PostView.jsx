import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetKidsQuery } from '../store/posts/posts.api';
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
  const { putRootComments, putToddlers } = useActions();
  const {
    data,
    isLoading: commentsAreLoading,
    isFetching: commentsAreFetching,
    isError: commentsLoadError,
    refetch,
  } = useGetKidsQuery('8863');

  const refresh = commentsAreFetching || commentsAreLoading;
  const commentsLoaded =
    !commentsAreFetching && !commentsAreLoading && !commentsLoadError;

  useEffect(() => {
    if (commentsLoaded) {
      putRootComments(data);
    }
  }, [commentsLoaded]);

  let firstLvlComments = useSelector((state) => state.views.rootComments);

  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);
  const { url, title, time, by: author, kids } = post;
  const noComments = !kids;

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
              <span>
                {noComments && !refresh && 'No comments yet... (-_-メ)'}
              </span>
              <p>{refresh && 'Refreshing comments...'}</p>
              {firstLvlComments.map((comment) => (
                <Comment key={comment.time} comment={comment} kids={kids} />
              ))}
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
