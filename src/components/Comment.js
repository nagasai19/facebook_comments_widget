import React, { useState } from "react";
import CommentActions from "./CommentActions";
import EditComment from "./EditComment";

function Comment({ comment, onReply, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [replyText, setReplyText] = useState("");
  const [isEditReply, setEditReply] = useState(false);

  const handleEdit = (e) => {
    e.preventDefault();
    if (!editText) {
      return;
    }
    onEdit(comment.id, editText);
    setEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleReply = (e) => {
    setEditReply(true);
    e.preventDefault();
    if (!replyText) {
      return;
    }
    onReply(replyText, comment.replies);
    setEditReply(false);
    setReplyText("");
  };

  return (
    <div className={`comment ${comment?.isParent}`}>
      <div className="text">
        {editing ? (
          <form onSubmit={handleEdit}>
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <button type="submit">Save</button>
            <span onClick={() => setEditing(false)} className="cancel-text">
              {" "}
              Cancel{" "}
            </span>
          </form>
        ) : (
          <div className="comment-container">
            <li className="text">{comment.text} </li>
            {comment?.isEdited && (
              <span className="edit-status"> ( Edited )</span>
            )}
          </div>
        )}
      </div>

      <CommentActions
        setEditReply={setEditReply}
        setEditing={setEditing}
        handleDelete={handleDelete}
        timestamp={comment.timestamp}
      />

      {comment?.replies?.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          onReply={onReply}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {isEditReply && (
        <EditComment
          handleReply={handleReply}
          setReplyText={setReplyText}
          replyText={replyText}
          setEditReply={setEditReply}
        />
      )}
    </div>
  );
}

export default Comment;
