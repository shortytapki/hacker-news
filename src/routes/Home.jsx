import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';
import GradientText from '../components/GradientText/GradientText';
import { useGetLatestPostsQuery } from '../store/posts/posts.api';

const MINUTE = 60000;

const Home = () => {
  const { isLoading, isFetching, isError, data, refetch } =
    useGetLatestPostsQuery(null, { pollingInterval: MINUTE });
  const posts = !isFetching && !isLoading && !isError && data;

  return (
    <>
      <Header>
        <div className="wrap">
          <button className={styles.button} onClick={refetch}>
            <GradientText>Refresh</GradientText>
          </button>
        </div>
      </Header>
      {!isFetching && data ? (
        <>
          {
            <main className={styles.home}>
              {posts.map((post, idx) => (
                <Post key={post.id} number={idx + 1}>
                  {post}
                </Post>
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
