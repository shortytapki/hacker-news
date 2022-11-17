import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePostActions } from '../../hooks/usePostsActions';
import { useGetCommentQuery } from '../../store/posts/posts.api';
import GradientText from '../GradientText/GradientText';
import CommentBody from './CommentBody';

const Comment = ({ commentData, parent, parentId, kidId, skip, replied }) => {
  const { isLoading, isFetching, isSuccess, data } = useGetCommentQuery(kidId, {
    skip: skip,
  });
  const { putReply } = usePostActions();
  const loaded = !isLoading && !isFetching && isSuccess;
  useEffect(() => {
    loaded &&
      commentData !== null &&
      putReply({
        parentId: parentId,
        kidId: kidId,
        commentData: data,
      });
  }, [loaded]);

  let replies = useSelector(
    (state) =>
      !parent && kidId !== undefined && kidId !== null && state.views.replies
  );
  replies = replies && replies.filter((rpl) => rpl.kidId === kidId);

  let body;

  if (commentData.deleted) return <p>Comment was deleted</p>;
  if (commentData !== null && commentData !== undefined && parent) {
    body = (
      <div className="blackwrap">
        {replied && (
          <div className="replynotif">
            <GradientText>Click on comment to see the replies</GradientText>
          </div>
        )}
        <CommentBody commentData={commentData} />
      </div>
    );
  } else {
    body = (
      <div className="replies">
        {replies &&
          replies.map((rpl, idx) => (
            <CommentBody commentData={rpl.commentData} key={idx} />
          ))}
      </div>
    );
  }
  return <>{body}</>;
};
export default Comment;
