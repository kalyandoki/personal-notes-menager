import { useState, useEffect } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  useEffect(() => {
    fetchNotes();
  }, [search, categoryFilter]);

  const fetchNotes = async () => {
    const response = await axios.get("http://localhost:5000/api/notes", {
      params: { search, category: categoryFilter },
    });
    setNotes(response.data);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Personal Notes Manager</h1>
        <NoteForm fetchNotes={fetchNotes} />
        <div className="my-4">
          <input
            type="text"
            placeholder="Search notes..."
            className="border p-2 rounded mb-2"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border p-2 rounded mb-2"
            onChange={(e) => setCategoryFilter(e.target.value)}
            value={categoryFilter}
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <NoteList notes={notes} fetchNotes={fetchNotes} />
      </div>
    </Router>
  );
};

export default App;
