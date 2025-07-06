// ...existing imports...
import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  updateDoc,
} from 'firebase/firestore';

function ToDoList() {
  // ...existing state...
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [smartInput, setSmartInput] = useState('');
  const [parsing, setParsing] = useState(false);

  const user = auth.currentUser;  

  // ...existing useEffect for tasks...

  // --- New: Smart Add Handler ---
// ...existing imports...
const handleSmartAdd = async (e) => {
  e.preventDefault();
  if (!smartInput.trim()) return;
  setParsing(true);

  try {
    const res = await fetch("/api/parse-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: smartInput }),
    });
    const parsed = await res.json();

    // Fallback in case parsing fails
    if (!parsed.text) {
      alert("Could not parse task. Please try again.");
      setParsing(false);
      return;
    }

    await addDoc(collection(db, 'tasks'), {
      text: parsed.text,
      uid: user.uid,
      createdAt: new Date(parsed.dueDate || Date.now()),
      completed: false,
      dueDate: parsed.dueDate || null,
      recurrence: parsed.recurrence || null,
    });
    setSmartInput('');
  } catch (err) {
    alert("Error adding smart task: " + err.message);
  }
  setParsing(false);
};

  // Mock AI parser (replace this with your real API later)
  async function mockParseTask(text) {
    // Very basic fake logic for demo
    return {
      text: text,
      dueDate: null,
    };
  }

  // ...existing handlers...

  return (
    <div>
      {/* --- New Smart Add UI --- */}
      <form onSubmit={handleSmartAdd} style={{ marginBottom: 8 }}>
        <input
          value={smartInput}
          onChange={e => setSmartInput(e.target.value)}
          placeholder="Try: 'Remind me to call mom next Monday at 8pm'"
          style={{ width: '70%', padding: 8 }}
          disabled={parsing}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }} disabled={parsing}>
          {parsing ? 'Parsing...' : 'Smart Add'}
        </button>
      </form>

      {/* ...existing Add Task form and task list below ... */}
      {/* keep your previous code here */}
    </div>
  );
}

export default ToDoList;