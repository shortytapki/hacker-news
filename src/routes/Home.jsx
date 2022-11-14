import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';
import { useGetLatestPostsQuery } from '../store/posts/posts.api';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useEffect } from 'react';

const MINUTE = 10000;

const Home = () => {
  const { putNew } = useActions();

  const { isLoading, isFetching, isError, data, refetch } =
    useGetLatestPostsQuery('', { pollingInterval: MINUTE });

  let posts = !isFetching && !isLoading && !isError && data;

  posts = !isFetching && !isLoading && !isError && posts.filter((post) => post);
  useEffect(() => {
    putNew(posts);
  }, [posts]);

  return (
    <>
      <Header page={'home'} handler={refetch} />
      {!isFetching && !isLoading && !isError && data ? (
        <>
          {
            <main className={styles.home}>
              {posts.map((post, idx) => (
                <Link to={`post/${post.id}`} key={idx}>
                  <Post key={post.id} number={idx + 1} onClick={() => {}}>
                    {post}
                  </Post>
                </Link>
              ))}
            </main>
          }
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
