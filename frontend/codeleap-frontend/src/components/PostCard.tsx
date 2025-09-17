import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Post } from '../types.ts/Posts';
dayjs.extend(relativeTime);

const Trash = () => (
  <svg width="18" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
  </svg>
);

const Edit = () => (
  <svg width="18" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

export default function PostCard({
  post, onEditClick, onDeleteClick
}:{
  post:Post;
  onEditClick:(p:Post)=>void;
  onDeleteClick:(p:Post)=>void;
}){
  const me = localStorage.getItem('username') || '';
  const isOwner = post.username === me;

  return (
    <article className="post">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        {isOwner && (
          <div className="actions">
            <button className="icon-btn" aria-label="Delete" onClick={()=>onDeleteClick(post)}><Trash/></button>
            <button className="icon-btn" aria-label="Edit" onClick={()=>onEditClick(post)}><Edit/></button>
          </div>
        )}
      </div>

      <div className="post-body">
        <div className="meta">
          <span className='post-subtitle'>@{post.username}</span>
          <span>{dayjs(post.created_datetime).fromNow()}</span>
        </div>
        <div className="content">{post.content}</div>
        
      </div>
    </article>
  );
}
