import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetCommentsQuery, useGetPostQuery } from '../store/posts/posts.api';
import RootComment from '../components/RootComment/RootComment';

const PostView = () => {
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
  } = useGetCommentsQuery('8863');
  let history = useHistory();
  // const { id } = useParams();

  const returnHandler = () => {
    history.push('/');
  };

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
      <Header handler={returnHandler} />
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
                <p>
                  {commentsCount
                    ? `Main comments: ${commentsCount}`
                    : 'No comments yet... (-_-メ)'}
                </p>
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
