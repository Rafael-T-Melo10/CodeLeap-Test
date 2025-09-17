import { useEffect, useRef, useState } from 'react';
import type { Post } from '../types.ts/Posts';
import '../style.css';

export default function EditModal({
  open, post, onCancel, onSave
}: {
  open: boolean;
  post: Post | null;
  onCancel: () => void;
  onSave: (patch: { title: string; content: string }) => void;
}) {
  const [title, setTitle] = useState(post?.title ?? '');
  const [content, setContent] = useState(post?.content ?? '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitle(post?.title ?? '');
    setContent(post?.content ?? '');
    if (open) setTimeout(()=>inputRef.current?.focus(), 0);
  }, [open, post]);

  if (!open || !post) return null;

  const canSave = title.trim() && content.trim();

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="edit-title">
      <div className="modal-card">
        <h2 id="edit-title">Edit item</h2>
        <span>Title</span>
        <input
          className="input"
          ref={inputRef}
          value={title}
          onChange={e=>setTitle(e.target.value)}
          placeholder="Title"
        />
        <span>Content</span>
        <textarea
          className="textarea"
          rows={4}
          value={content}
          onChange={e=>setContent(e.target.value)}
          placeholder="Content"
        />

        <div className="actions">
          <button className="btn-outline" onClick={onCancel} type="button">Cancel</button>
          <button className="btn btn-primary" disabled={!canSave} onClick={()=>onSave({ title: title.trim(), content: content.trim() })}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
