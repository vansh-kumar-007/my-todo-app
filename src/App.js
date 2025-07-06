import React, { useEffect, useState } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import ToDoList from './ToDoList';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login onLogin={() => {}} />;
  }

  return (
    <div style={{maxWidth: 600, margin: 'auto', padding: 20}}>
      <h1>Hello, {user.email}!</h1>
      <button onClick={() => signOut(auth)}>Logout</button>
      <ToDoList />
    </div>
  );
}

export default App;