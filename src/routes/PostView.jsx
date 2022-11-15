import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetKidsQuery } from '../store/posts/posts.api';
import Comment from '../components/Comment/Comment';
import Button from '../components/Button/Button';
import Comments from '../components/Comments/Comments';
import { useActions } from '../hooks/useActions';
import { useEffect } from 'react';

const PostView = () => {
  let history = useHistory();
  const returnHandler = () => {
    history.push('/');
  };
  const { id } = useParams();

  const { putRootComments } = useActions();
  const {
    data: rootCommentsData,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetKidsQuery(id);
  useEffect(() => {
    isSuccess && putRootComments(rootCommentsData);
  }, [isSuccess]);

  const rootComments = useSelector((state) => state.views.rootComments);
  const loading = isFetching || isLoading;

  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);
  const { url, title, time, by: author, descendants } = post;

  console.log(rootComments);

  const counterMsg =
    (descendants === 0 && `${descendants} comments... (-_-メ)`) ||
    (descendants > 1
      ? `${descendants} comments (~˘▾˘)~`
      : '1 comment \\ (•◡•) /');
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
            <div className={styles.refresh}>
              <Button handler={refetch}>Refresh comments</Button>
              {!loading && <span>{counterMsg}</span>}
              {loading && <span>Loading... (づ￣ ³￣)づ</span>}
            </div>

            <section className={styles.comments}>
              {/* <Comments root={id} /> */}
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
