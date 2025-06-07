/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useFormSchema } from "@/hooks/useFormSchema";
import { commentControl, commentState } from "@/config";
import { useCommentStore } from "@/store/useCommentStore";

const PostInput = ({ postId }) => {
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const {
    createReply,
    createComment,
    selectedPost,
    selectedComment,
    setSelectedComment,
  } = useCommentStore();

  const commentForm = useFormSchema(
    commentState,
    commentControl,
    selectedComment?.commentId ? createReply : createComment,
    postId
  );

  useEffect(() => {
    if (selectedComment?.postId === postId && inputRef.current) {
      inputRef.current.focus();
    }

    if (selectedComment?.commentId) {
      commentForm.setFieldValue("content", `@${selectedComment?.username} `);
    }
  }, [selectedPost, selectedComment]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setSelectedComment(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      ref={formRef}
      className="flex items-center py-2"
      onSubmit={commentForm?.handleSubmit}
    >
      <input
        ref={inputRef}
        type="text"
        name="content"
        placeholder="Add a comment..."
        className="input-primary text-sm"
        value={commentForm?.values?.content}
        onChange={commentForm?.handleChange}
      />
      <button className="btn-accent" disabled={!commentForm?.values?.content}>
        Post
      </button>
    </form>
  );
};

export default PostInput;
