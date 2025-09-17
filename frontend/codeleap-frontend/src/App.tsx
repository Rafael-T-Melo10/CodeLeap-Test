import { useState } from 'react';
import { loadUsername, saveUsername } from './auth/storage';
import SignupModal from './components/SignupModal';
import HomePage from './pages/HomePage';

export default function App() {
  const [username, setUsername] = useState(loadUsername());

  function handleSignup(u: string) {
    saveUsername(u);
    setUsername(u);
  }

  return (
    <>
      <SignupModal isOpen={!username} onSubmit={handleSignup} />

      {username && (
        <>
          <HomePage />
        </>
      )}
    </>
  );
}
