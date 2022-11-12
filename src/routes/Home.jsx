import * as React from 'react';
import Post from '../components/Post/Post';
import Header from '../components/Header/Header';
import styles from './Home.module.css';
import Loading from '../components/Loading/Loading';
import { useState, useEffect } from 'react';

const AMOUNT_OF_POSTS = 10;
const MINUTE = 60000;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState(false);

  const getPostsId = async (id) => {
    const postRes = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
    );
    return await postRes.json();
  };

  const loadPosts = async () => {
    const srotiesRes = await fetch(
      'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty'
    );
    let postsId = await srotiesRes.json();
    postsId = postsId.sort((a, b) => b.time > a.time).slice(0, AMOUNT_OF_POSTS);
    let postsArr = [];
    for (let inc = 0; inc <= postsId.length - 1; inc++)
      postsArr.push(await getPostsId(postsId[inc]));
    setPosts(postsArr);
    setData(true);
  };

  loadPosts();

  useEffect(() => {
    const interval = setInterval(() => {
      setData(false);
      loadPosts();
    }, MINUTE);
    return () => {
      clearInterval(interval);
    };
  }, [posts]);

  // useEffect(() => {
  //   getLatestPosts();
  // }, []);

  // useEffect(() => {
  // const interval = setInterval(async () => {
  //   await getLatestPosts();
  // }, 10000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // });

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
