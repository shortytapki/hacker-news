import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetCommentsQuery, useGetPostQuery } from '../store/posts/posts.api';
import RootComment from '../components/RootComment/RootComment';
import Button from '../components/Button/Button';

const PostView = () => {
  let history = useHistory();

  const returnHandler = () => {
    history.push('/');
  };
  // const { id } = useParams();
  const {
    data: postData,
    isLoading: postIsLoading,
    isFetching: postIsFetching,
    isError: postLoadError,
  } = useGetPostQuery('8863');
  const {
    data: comments,
    isLoading: commentsAreLoading,
    isFetching: commentsAreFetching,
    isError: commentsLoadError,
    refetch,
  } = useGetCommentsQuery('8863');

  const post = !postIsLoading && !postIsFetching && !postLoadError && postData;
  const commentsLoaded =
    !commentsAreFetching && !commentsAreLoading && !commentsLoadError;

  let firstLvlComments =
    commentsLoaded && comments.filter((comment) => comment !== null);

  // const post = useSelector((state) => state.views.posts)
  //   .filter((data) => +id === data.id)
  //   .at(0);
  const { url, title, time, by: author, descendants: commentsCount } = post;

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
                  <p>
                    {commentsCount
                      ? `Main comments: ${commentsCount}`
                      : 'No comments yet... (-_-メ)'}
                  </p>
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
              {!commentsLoaded && 'Loading comments...'}
              {commentsLoaded &&
                firstLvlComments.map((comment) => (
                  <RootComment key={comment.id} comment={comment} />
                ))}
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
