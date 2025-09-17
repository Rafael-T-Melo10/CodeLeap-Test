const SortIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h13M3 12h9M3 18h5"/>
    <path d="M17 3v18l4-4"/>
  </svg>
);

type Props = {
  onSignOut?: () => void;
  onToggleSort?: () => void;
  sortOpen?: boolean;
};

export default function Header({ onSignOut, onToggleSort, sortOpen }: Props){
  const username = localStorage.getItem('username') || '';

  function handleSignOut(){
    localStorage.removeItem('username');
    if (onSignOut) onSignOut();
    else window.location.reload();
  }

  return (
    <div className="app-header">
      <span>CodeLeap Network</span>
      <div className="header-actions">
        <button
          className={`icon-btn ${sortOpen ? 'active' : ''}`}
          onClick={onToggleSort}
          aria-label="Sorting & filtering"
          aria-expanded={!!sortOpen}
          aria-controls="sortFilterPanel"
          type="button"
          title="Sorting & filtering"
        >
          <SortIcon/>
        </button>

        {username && <span className="header-user">@{username}</span>}
        <button className="logout-btn" onClick={handleSignOut} type="button">
          Change user
        </button>
      </div>
    </div>
  );
}
