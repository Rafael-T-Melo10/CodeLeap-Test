import { useState } from 'react';
import { createPost } from '../api';

export default function PostForm({ onCreated }: { onCreated: (post: any) => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);

  const canPost = title.trim() && content.trim();

  async function submit() {
    if (!canPost) return;
    setBusy(true);
    const username = localStorage.getItem('username') || '';
    const created = await createPost({
      username,
      title: title.trim(),
      content: content.trim(),
    });
    setTitle(''); setContent(''); setBusy(false);
    onCreated(created);
  }

  return (
    <div className="panel">
      <h2 className="title-main">What’s on your mind?</h2>

      <label className="field">
        <span>Title</span>
        <input
          className="input"
          placeholder="Hello world"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </label>

      <label className="field">
        <span>Content</span>
        <textarea
          className="textarea"
          placeholder="Content here"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />
      </label>

      <div className="actions">
        <button className="btn" disabled={busy || !canPost} onClick={submit}>
          {busy ? 'Posting…' : 'Create'}
        </button>
      </div>
    </div>
  );
}
