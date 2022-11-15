import styles from './Comments.module.css';
import { useGetKidsQuery } from '../../store/posts/posts.api';
import { useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import Button from '../Button/Button';
import Comment from '../Comment/Comment';

const Comments = ({ parent }) => {
  // return (
  //   <section className={styles.comments}>
  //     <Button handler={refetch}>Refresh comments</Button>
  //     {isSuccess &&
  //       rootComments.map((comment) => (
  //         <Comment comment={comment} key={comment.time} parent={comment.id} />
  //       ))}
  //     <div className="commentwrap"></div>
  //   </section>
  // );
};

export default Comments;
