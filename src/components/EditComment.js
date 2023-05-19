import React from "react";

function EditComment({ handleReply, setReplyText, setEditReply, replyText }) {
  return (
    <div className="comment-form reply-form">
      <form onSubmit={handleReply}>
        <label>
          Reply:
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
        </label>
        <button type="submit">Reply</button>
        <span
          className="cancel-text"
          onClick={() => {
            setReplyText("");
            setEditReply(false);
          }}
        >
          Cancel
        </span>
      </form>
    </div>
  );
}

export default EditComment;
