import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';
import { useGetLatestPostsQuery } from '../store/posts/posts.api';
import { Link } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useEffect } from 'react';
import Button from '../components/Button/Button';

const MINUTE = 60000;

const Home = () => {
  const { putNewPosts } = useActions();

  const { isLoading, isFetching, isError, data, refetch } =
    useGetLatestPostsQuery('', { pollingInterval: MINUTE });

  let posts = !isFetching && !isLoading && !isError && data;

  posts = !isFetching && !isLoading && !isError && posts.filter((post) => post);
  useEffect(() => {
    putNewPosts(posts);
  }, [posts]);

  return (
    <>
      {isError && 'Could not get data, try again later :('}
      <Header>
        <Button handler={refetch}>Refresh news</Button>
      </Header>
      {!isFetching && !isLoading && !isError && data ? (
        <>
          {
            <main className={styles.home}>
              {posts.map((post, idx) => (
                <Link to={`post/${post.id}`} key={idx}>
                  <Post key={post.id} number={idx + 1} post={post} />
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
