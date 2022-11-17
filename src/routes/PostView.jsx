import { useParams, useHistory } from 'react-router';
import Header from '../components/Header/Header';
import { useSelector } from 'react-redux';
import styles from './PostView.module.css';
import GradientText from '../components/GradientText/GradientText';
import { useGetKidsQuery } from '../store/posts/posts.api';
import Comment from '../components/Comment/Comment';
import Button from '../components/Button/Button';
import { usePostActions } from '../hooks/usePostsActions';
import { useEffect } from 'react';

const PostView = () => {
  let history = useHistory();

  const returnHandler = () => {
    history.push('/');
  };

  const { id } = useParams();

  const { putRootComments, loadReply } = usePostActions();

  const {
    data: rootCommentsData,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useGetKidsQuery(id);

  const loaded = isSuccess && !isLoading && !isFetching;

  useEffect(() => {
    loaded && putRootComments(rootCommentsData);
  }, [loaded, rootCommentsData, putRootComments]);

  let rootComments = useSelector((state) => state.views.comments);
  console.log(rootComments);
  // if (loaded) rootComments = rootComments((comment) => comment.parent === id);

  const loading = isFetching || isLoading;

  const post = useSelector((state) => state.views.posts)
    .filter((data) => +id === data.id)
    .at(0);

  const { url, title, time, by: author, descendants } = post;
  const loadRepliesFor = useSelector((state) => state.views.loadRepliesFor);

  let counterMsg;

  if (descendants !== undefined && descendants !== null && descendants) {
    counterMsg =
      (descendants === 0 && `${descendants} comments... (-_-メ)`) ||
      (descendants > 1 && `${descendants} comments (~˘▾˘)~`) ||
      (descendants === 1 && '1 comment \\ (•◡•) /');
  } else {
    counterMsg =
      (rootComments.length === 0 &&
        `${rootComments.length} comments... (-_-メ)`) ||
      (rootComments.length > 1 && `${rootComments.length} comments (~˘▾˘)~`) ||
      (rootComments.length === 1 && '1 comment \\ (•◡•) /');
  }

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
                  className="link"
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
              {rootComments.map((comment) => {
                const skip = !loadRepliesFor.includes(comment.id);
                return (
                  <div className="commentwrap" key={comment.id}>
                    <div className={styles.blackwrap}>
                      <section
                        onClick={() => {
                          loadReply(comment.id);
                        }}
                      >
                        <Comment
                          parent
                          commentData={comment}
                          skip={skip}
                          parentId={comment.id}
                          replied={comment.kids !== undefined}
                        />
                        <section className={styles.comments}>
                          {!skip &&
                            comment.kids !== undefined &&
                            comment.kids.map((kid) => {
                              return (
                                <Comment
                                  parentId={comment.id}
                                  kidId={kid}
                                  skip={false}
                                  key={kid}
                                />
                              );
                            })}
                        </section>
                      </section>
                    </div>
                  </div>
                );
              })}
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default PostView;
