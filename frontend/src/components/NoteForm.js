import { useState } from "react";
import axios from "axios";

const NoteForm = ({ fetchNotes, noteToEdit }) => {
  const [title, setTitle] = useState(noteToEdit ? noteToEdit.title : "");
  const [description, setDescription] = useState(
    noteToEdit ? noteToEdit.description : ""
  );
  const [category, setCategory] = useState(
    noteToEdit ? noteToEdit.category : "Others"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNote = { title, description, category };

    if (noteToEdit) {
      await axios.put(
        `http://localhost:5000/api/notes/${noteToEdit._id}`,
        newNote
      );
    } else {
      await axios.post("http://localhost:5000/api/notes", newNote);
    }

    fetchNotes();
    setTitle("");
    setDescription("");
    setCategory("Others");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded mb-2 w-full"
        required
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mb-2 w-full"
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Others">Others</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {noteToEdit ? "Update Note" : "Add Note"}
      </button>
    </form>
  );
};

export default NoteForm;
