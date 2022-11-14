import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useGetRepliesQuery } from '../../store/posts/posts.api';

import GradientText from '../GradientText/GradientText';
import Reply from '../Reply/Reply';
import styles from './Comment.module.css';

const Comment = ({ comment, root }) => {
  const [skip, setSkip] = useState(true);
  const { by: author, text, time, id, kids } = comment;
  const { putNewReplies } = useActions();

  useGetRepliesQuery(root, { skip: skip });
  // console.log(kids);
  // // const replyId = (kids.length !== 0 && kids.at(0)) || id;
  const { data, isError, isLoading, isFetching } = useGetRepliesQuery(id, {
    skip: skip,
  });

  const repliesLoaded = !isLoading && !isError && !isFetching;

  useEffect(() => {
    if (kids) {
      putNewReplies({
        loadedParent: id,
        replies: data,
      });
    }
  }, [repliesLoaded, id, kids, data]);

  const date = new Date(time * 1000).toLocaleString();

  return (
    <article className="commentwrap" onClick={() => setSkip((prev) => !prev)}>
      <div className={styles.blackwrap}>
        <header className={styles.header}>
          <p>
            <GradientText>
              {author}
              <br /> at {date}
            </GradientText>
          </p>
        </header>
        <section
          className={styles.comment}
          dangerouslySetInnerHTML={{ __html: text }}
        ></section>
        {/* {replies && (
          <section className={styles.replies}>
            <h2>Replies:</h2>
            {replies.map(
              (reply) =>
                reply !== null && (
                  <Reply key={comment.time} comment={comment} root={id}/>
                )
            )}
          </section>
        )} */}
      </div>
    </article>
  );
};

export default Comment;
