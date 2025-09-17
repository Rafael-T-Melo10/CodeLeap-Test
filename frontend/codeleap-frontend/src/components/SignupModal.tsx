import { useEffect, useRef, useState } from 'react';
import '../style.css';

type Props = {
  isOpen: boolean;
  onSubmit: (username: string) => void;
};

export default function SignupModal({ isOpen, onSubmit }: Props) {
  const [name, setName] = useState('');
  const [touched, setTouched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const valid = name.trim().length >= 3;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setTouched(true);
    if (valid) onSubmit(name.trim());
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-title"
    >
      <form className="modal-card" onSubmit={handleSubmit}>
        <h1 id="signup-title">Welcome to CodeLeap network!</h1>
        <label className="field">
          <span>Please enter your username</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="e.g. rafael_melo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setTouched(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
        </label>

        {!valid && touched && (
          <p className="hint">Username must be at least 3 characters.</p>
        )}

        <div className="actions ">
          <button className='btn' type="submit" disabled={!valid}>
            ENTER
          </button>
        </div>
      </form>
    </div>
  );
}
