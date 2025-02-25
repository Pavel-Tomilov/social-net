import './PostView.css';
import { FC } from "react"
import { Post } from '../../api/Post';

function formatDate(timestamp:number): string {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString(undefined, {
    timeStyle: 'medium',
  })}`;
}

export interface PostViewProps {
  post: Post;
}

export const PostView: FC<PostViewProps> = ({ post }) => {
  return (
    <div className="post-view">
      <p className="post-view__text">{post.text}</p>

      <time className="post-view__time">{formatDate(post.createdAt)}</time>
    </div>
  );
};
