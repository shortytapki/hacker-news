import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';
import { useGetLatestPostsQuery } from '../store/posts/posts.api';
import { Link } from 'react-router-dom';
import { usePostActions } from '../hooks/usePostsActions';
import { useEffect } from 'react';
import Button from '../components/Button/Button';
import { useSelector } from 'react-redux';

const MINUTE = 60000;

const Home = () => {
  const { putNewPosts } = usePostActions();

  const { isLoading, isFetching, data, isSuccess, refetch } =
    useGetLatestPostsQuery('', {
      pollingInterval: MINUTE,
    });

  useEffect(() => {
    isSuccess && putNewPosts(data);
  }, [isSuccess]);

  const posts = useSelector((state) => state.views.posts);

  return (
    <>
      <Header>
        <Button handler={refetch}>Refresh news</Button>
      </Header>
      {!isFetching && !isLoading ? (
        <>
          {
            <main className={styles.home}>
              {posts.map(
                (post, idx) =>
                  post !== null && (
                    <Link to={`post/${post.id}`} key={idx}>
                      <Post key={post.id} number={idx + 1} post={post} />
                    </Link>
                  )
              )}
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
