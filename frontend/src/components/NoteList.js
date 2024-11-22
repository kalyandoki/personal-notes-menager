import axios from "axios";

const NoteList = ({ notes, fetchNotes }) => {
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div>
      {notes.map((note) => (
        <div key={note._id} className="border p-4 rounded mb-4">
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.description}</p>
          <p className="text-sm text-gray-600">Category: {note.category}</p>
          <button
            onClick={() => deleteNote(note._id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
