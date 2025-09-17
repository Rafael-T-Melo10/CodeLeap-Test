import '../style.css';

export default function DeleteAlert({
  open, onCancel, onConfirm
}: { open: boolean; onCancel: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="del-title">
      <div className="modal-card">
        <h2 id="del-title">Are you sure you want to delete this item?</h2>
        <div className="actions">
          <button className="btn-outline" onClick={onCancel} type="button">Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
