import React from "react";
import { formatDateTime } from "../common/utils";

function CommentActions({ setEditReply, setEditing, handleDelete, timestamp }) {
  return (
    <div className="info">
      <span className="comment-time-elapsed">
        {" "}
        {formatDateTime(timestamp)}{" "}
      </span>
      <span className="reply " onClick={() => setEditReply(true)}>
        {" "}
        Reply{" "}
      </span>
      <span className="edit " onClick={() => setEditing(true)}>
        {" "}
        Edit{" "}
      </span>
      <span className="delete" onClick={handleDelete}>
        {" "}
        Delete{" "}
      </span>
    </div>
  );
}

export default CommentActions;
