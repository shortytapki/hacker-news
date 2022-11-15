import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import Comment from '../components/Comment/Comment';
import Button from '../components/Button/Button';

const PostView = () => {
  let history = useHistory();
  const returnHandler = () => {
    history.push('/');
  };
  const { id } = useParams();

  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);
  const { url, title, time, by: author } = post;

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
            <section className={styles.comments}>
              <Comment root={id} />
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
