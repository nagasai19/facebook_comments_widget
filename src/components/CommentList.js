import React, { useState } from "react";
import {
  deleteComment,
  updateComment,
  CURRENT_DATE_AND_TIME
} from "../common/utils";
import Comment from "./Comment";
import AddComment from "./AddComment";
import "../styles/comment.css";

function CommentList() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment) {
      return;
    }
    const newCommentObj = {
      id: Date.now(),
      text: newComment,
      replies: [],
      isParent: true,
      isEdited: false,
      timestamp: CURRENT_DATE_AND_TIME
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleReply = (replyText, currentReplies) => {
    const newReply = {
      id: Date.now(),
      text: replyText,
      timestamp: CURRENT_DATE_AND_TIME,
      replies: []
    };
    currentReplies.unshift(newReply);
    setComments([...comments]);
  };

  const handleDelete = (commentId) => {
    const exisitingComments = [...comments];
    const deleteSelectedComment = deleteComment(exisitingComments, commentId);
    setComments(deleteSelectedComment);
  };

  const handleEdit = (commentId, editText) => {
    const exisitingComments = [...comments];
    const updateSelectedComment = updateComment(
      exisitingComments,
      commentId,
      editText
    );
    setComments(updateSelectedComment);
  };

  return (
    <div className="comment-widget">
      <AddComment
        handleSubmit={handleSubmit}
        newComment={newComment}
        setNewComment={setNewComment}
      />

      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onReply={handleReply}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default CommentList;
