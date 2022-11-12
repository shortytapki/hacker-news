import * as React from 'react';
import { useEffect, useState } from 'react';
import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';

const AMOUNT_OF_POSTS = 10;
const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getLatestPosts = async () => {
      const getPost = async (id) => {
        const postRes = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
        );
        return await postRes.json();
      };
      const srotiesRes = await fetch(
        'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
      );
      let postsId = await srotiesRes.json();
      let posts = [];
      postsId = postsId
        .sort((a, b) => b.time > a.time)
        .slice(0, AMOUNT_OF_POSTS);
      for (let inc = 0; inc <= postsId.length - 1; inc++)
        posts.push(await getPost(postsId[inc]));
      setPosts(posts);
    };
    getLatestPosts();
  }, []);

  const data = posts.length !== 0;
  return (
    <>
      {data ? (
        <>
          <Header />
          <main className={styles.home}>
            {data &&
              posts.map((post, idx) => (
                <Post key={post.id} number={idx + 1}>
                  {post}
                </Post>
              ))}
          </main>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Home;
