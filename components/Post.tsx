import type Prisma from "@prisma/client";

type PostProps = {
  post: Prisma.Post;
};

const Post = ({ post }: PostProps) => {
  return (
    <div className="posts" key={post.id}>
      <div>{post.id}</div>
      <div>{post.authorId}</div>
      <div>{post.title}</div>
      <div>{post.content}</div>
      <div>{post.published}</div>
    </div>
  );
};

export default Post;
