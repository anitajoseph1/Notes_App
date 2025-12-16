const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

// Create a note (with optional image)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const note = await Note.create({
      user: req.userId,
      title,
      description,
      imageUrl,
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("Create note error:", err);
    res.status(500).json({ message: "Error creating note" });
  }
});

// Get all notes of logged in user
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
});

// Delete a note
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.deleteOne({ _id: req.params.id, user: req.userId });
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Delete note error:", err);
    res.status(500).json({ message: "Error deleting note" });
  }
});

// Update a note
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
