import React from "react";

function AddComment(props) {
  const { handleSubmit, newComment, setNewComment } = props;
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button type="submit">Add New Comment</button>
    </form>
  );
}

export default AddComment;
