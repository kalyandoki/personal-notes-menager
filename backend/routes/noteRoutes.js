const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel");

// Create a new note
router.post("/", async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newNote = new Note({ title, description, category });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});

// Get all notes with optional category filter
router.get("/", async (req, res) => {
  const { category, search } = req.query;
  try {
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const notes = await Note.find(filter).sort({ created_at: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

// Update a note by ID
router.put("/:id", async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, description, category, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
});

// Delete a note by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note", error });
  }
});

module.exports = router;
