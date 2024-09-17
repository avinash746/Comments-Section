import { useState, useRef, useEffect } from "react";
import Action from "../Action";
import "./styles.css";
import deleteIcon from "../../assets/bin.png";
import CommentInput from "./CommentInput";
import formatDate from "../../helpers/formatDate";


const Comments = ({
  handleInsertNode,
  handleEditNode,
  handleDeleteNode,
  comment,
}) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [expand, setExpand] = useState(false);
  const inputRef = useRef(null);
  const [nameRequired, setNameRequired] = useState(false);
  const [commentRequired, setCommentRequired] = useState(false);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [editMode]);

  const handleNewComment = () => {
    setExpand(!expand);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (!name) {
      setNameRequired(true);
    } else {
      setNameRequired(false);
    }
    if (!commentText) {
      setCommentRequired(true);
    } else {
      setCommentRequired(false);
    }
  
    if (!name || !commentText) {
      return;
    }
    if (editMode) {
      handleEditNode(comment.id, inputRef?.current?.innerText);
    } else {
      setExpand(true);
      handleInsertNode(comment.id, name, commentText);
      setShowInput(false);
      setName("");
      setCommentText("");
    }

    if (editMode) setEditMode(false);
  };

  const handleDelete = () => {
    handleDeleteNode(comment.id);
  };

  return (
    <>
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <>
            <span>Comment</span>
            <section className="main_comment">
            <CommentInput
                name={name}
                setName={setName}
                commentText={commentText}
                setCommentText={setCommentText}
                onAddComment={onAddComment}
                nameRequired={nameRequired}
                commentRequired={commentRequired}
              />
            </section>
          </>
        ) : (
          <section className="reply_card">
            <span className="date">
              {formatDate(comment.id)}
            </span>
            <h4
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
            >
              {comment.name}
            </h4>
            <span
              contentEditable={editMode}
              suppressContentEditableWarning={editMode}
              style={{ wordWrap: "break-word" }}
            >
              {comment.comment}
            </span>

            <div style={{ display: "flex", marginTop: "5px" }}>
              {editMode ? (
                <>
                  <Action
                    className="reply"
                    type="Save"
                    handleClick={onAddComment}
                  />
                  <Action
                    className="reply"
                    type="Cancel"
                    handleClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.commentText;
                      setEditMode(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Action
                    className="reply"
                    type="Reply"
                    handleClick={handleNewComment}
                  />
                  <Action
                    className="edit"
                    type="Edit"
                    handleClick={() => {
                      setEditMode(true);
                    }}
                  />
                  <Action
                    className="delete"
                    type={<img src={deleteIcon} alt="delete icon" />}
                    handleClick={handleDelete}
                  />
                </>
              )}
            </div>
          </section>
        )}
      </div>

      <div
        style={{
          display: expand ? "block" : "none",
          paddingLeft: 25,
          marginTop: 8,
        }}
      >
        {showInput && (
          <div className="replyInputContainer">
            <h5>Reply</h5>
            <div className="replyInputContainer_form">
              
            <input
              type="text"
              autoFocus
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              required
              />
              {nameRequired && !name && <span style={{ color: 'red', fontSize: '12px' }}>Name is required</span>}
            <input
              type="text"
              autoFocus
              placeholder="Comment"
              onChange={(e) => setCommentText(e.target.value)}
              required
              />
              {commentRequired && !commentText && <span style={{ color: 'red', fontSize: '12px' }}>Comment is required</span>}
            <Action
              className="comment"
              type="POST"
              handleClick={onAddComment}
              />
              </div>
          </div>
        )}

        {comment?.items?.map((cmnt) => {
          return (
            <Comments
              key={cmnt.id}
              handleInsertNode={handleInsertNode}
              handleEditNode={handleEditNode}
              handleDeleteNode={handleDeleteNode}
              comment={cmnt}
            />
          );
        })}
      </div>
    </>
  );
};

export default Comments;
