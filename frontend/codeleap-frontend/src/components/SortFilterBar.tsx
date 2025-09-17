import { useState } from 'react';

export type SortBy = 'newest' | 'oldest';
export type Filter = { author?: string; q?: string; onlyMine?: boolean; };

export default function SortFilterBar({
  value, sortBy, onChange
}: {
  value: Filter;
  sortBy: SortBy;
  onChange: (next: { value?: Filter; sortBy?: SortBy }) => void;
}) {
  const [author, setAuthor] = useState(value.author ?? '');
  const [q, setQ] = useState(value.q ?? '');
  const [onlyMine, setOnlyMine] = useState(!!value.onlyMine);

  function apply() {
    onChange({ value: { ...value, author: author || undefined, q: q || undefined, onlyMine } });
  }

  return (
    <div className="panel" style={{ marginTop: 16 }}>
      <div style={{ display:'grid', gap: 12 }}>
        <div style={{ display:'grid', gap: 8 }}>
          <label>Sort</label>
          <select
            className="input"
            value={sortBy}
            onChange={(e)=>onChange({ sortBy: e.target.value as SortBy })}
          >
            <option value="newest">Most recent</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>

        <div style={{ display:'grid', gap: 8 }}>
          <label>Filter by author (@username)</label>
          <input className="input" placeholder="e.g. rafael" value={author} onChange={e=>setAuthor(e.target.value)} />
        </div>

        <div style={{ display:'grid', gap: 8 }}>
          <label>Search in title/content</label>
          <input className="input" placeholder="keyword…" value={q} onChange={e=>setQ(e.target.value)} />
        </div>

        <label style={{ display:'flex', alignItems:'center', gap:8 }}>
          <input type="checkbox" checked={onlyMine} onChange={e=>setOnlyMine(e.target.checked)} />
          Show only my posts
        </label>

        <div className="actions">
          <button className="btn-outline" onClick={()=>{ setAuthor(''); setQ(''); setOnlyMine(false); onChange({ value:{}, sortBy }); }}>
            Clear
          </button>
          <button className="btn btn-primary" onClick={apply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
