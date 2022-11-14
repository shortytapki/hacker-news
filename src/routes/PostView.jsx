import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';

const PostView = () => {
  let history = useHistory();
  const { id } = useParams();
  const returnHandler = () => {
    history.push('/');
  };
  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);
  const { url, title, time, by: author, descendants: comments } = post;
  return (
    <>
      <Header handler={returnHandler} />
      <div className={styles.view}>
        <div className="viewwrap">
          <article className={styles.article}>
            <header className={styles.header}>
              <h1 className={styles.title}>{title}</h1>
              <a href={url} className={styles.link}>
                Go to the original post
              </a>
              <p>{comments ? comments : 'No comments yet... (-_-メ)'}</p>
            </header>
            <section className={styles.comments}></section>
            <footer className={styles.author}>
              <p>
                <GradientText>
                  by {author}
                  <br />
                  at {new Date(time * 1000).toLocaleString()}
                </GradientText>
              </p>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
