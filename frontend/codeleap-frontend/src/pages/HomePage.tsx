import { useEffect, useMemo, useState } from 'react';
import type { Post } from '../types.ts/Posts';
import { deletePost, listPosts, updatePost } from '../api';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import EditModal from '../components/EditModal';
import DeleteAlert from '../components/DeleteAlert';
import Header from '../components/Header';
import SortFilterBar, { type SortBy, type Filter } from '../components/SortFilterBar';

function sortByKey(sortBy: SortBy) {
  return (a: Post, b: Post) => {
    const ta = new Date(a.created_datetime).getTime();
    const tb = new Date(b.created_datetime).getTime();
    return sortBy === 'newest' ? tb - ta : ta - tb;
  };
}

export default function HomePage() {
  const [items, setItems] = useState<Post[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [confirmDel, setConfirmDel] = useState<Post | null>(null);

  const [sortBy, setSortBy] = useState<SortBy>('newest');
  const [filter, setFilter] = useState<Filter>({});
  const [showSort, setShowSort] = useState(false);

  const me = localStorage.getItem('username') || '';

  const visible = useMemo(() => {
    return items
      .filter(p => !filter.onlyMine || p.username === me)
      .filter(p => !filter.author || p.username.toLowerCase().includes((filter.author ?? '').toLowerCase()))
      .filter(p => {
        if (!filter.q) return true;
        const q = filter.q.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
      })
      .sort(sortByKey(sortBy));
  }, [items, filter.onlyMine, filter.author, filter.q, me, sortBy]);

  async function loadInitial() {
    setLoading(true);
    const { results, next } = await listPosts();
    setItems(results.sort((a,b)=>new Date(b.created_datetime).getTime()-new Date(a.created_datetime).getTime()));
    setNextUrl(next);
    setLoading(false);
  }

  async function loadMore() {
    if (!nextUrl) return;
    const { results, next } = await listPosts(nextUrl);
    setItems(prev => {
      const merged = [...prev, ...results];
      const map = new Map(merged.map(p => [p.id, p]));
      return Array.from(map.values());
    });
    setNextUrl(next);
  }

  useEffect(() => {
    loadInitial();
    const id = setInterval(loadInitial, 20000);
    return () => clearInterval(id);
  }, []);

  function handleCreated(post: Post) {
    setItems(prev => [post, ...prev]);
  }

  async function handleSaveEdit(patch: { title: string; content: string }) {
    if (!editPost) return;
    const updated = await updatePost(editPost.id, patch);
    setItems(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    setEditPost(null);
  }

  async function handleConfirmDelete() {
    if (!confirmDel) return;
    await deletePost(confirmDel.id);
    setItems(prev => prev.filter(p => p.id !== confirmDel.id));
    setConfirmDel(null);
  }

  return (
    <div className="app-wrap">
      <div className="app">
        <Header
          sortOpen={showSort}
          onToggleSort={() => setShowSort(s => !s)}
        />

        <div className="container">
          <PostForm onCreated={handleCreated} />

          <div id="sortFilterPanel" className={`collapsible ${showSort ? 'open' : ''}`}>
            <SortFilterBar
              value={filter}
              sortBy={sortBy}
              onChange={({ value, sortBy: sb }) => {
                if (value) setFilter(value);
                if (sb) setSortBy(sb);
              }}
            />
          </div>

          {loading && !items.length ? <p className="subtitle" style={{padding:'12px 0'}}></p> : null}

          {visible.map(p => (
            <PostCard
              key={p.id}
              post={p}
              onEditClick={(post) => setEditPost(post)}
              onDeleteClick={(post) => setConfirmDel(post)}
            />
          ))}

          {nextUrl && (
            <div className="load-more">
              <button className="btn-outline" onClick={loadMore}>Load more</button>
            </div>
          )}
        </div>

        <EditModal
          open={!!editPost}
          post={editPost}
          onCancel={() => setEditPost(null)}
          onSave={handleSaveEdit}
        />
        <DeleteAlert
          open={!!confirmDel}
          onCancel={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}
