import Action from "../../Action";

const CommentInput = ({ name, setName, commentText, setCommentText, onAddComment, nameRequired, commentRequired }) => {
    return (
      <>
        <input
          type="text"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name..."
          required
        />
        {nameRequired && !name && <span style={{ color: 'red', fontSize: '12px'}}>Name is required</span>}
        <input
          type="text"
          autoFocus
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Comment..."
          required
        />
        {commentRequired && !commentText && <span style={{ color: 'red', fontSize: '12px'}}>Comment is required</span>}
        <Action
          className="reply comment"
          type="POST"
          handleClick={onAddComment}
        />
      </>
    );
  };

export default CommentInput;