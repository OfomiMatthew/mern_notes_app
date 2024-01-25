require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./connectDB");
const Notes = require("./models/Notes");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get all notes

app.get("/api/notes", async (req, res) => {
  try {
    const data = await Notes.find({}).sort({ createdAt: -1 });
    if (!data) {
      throw new Error("An error occured while fetching data");
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured while fetching data" });
  }
});

// get a note
app.get("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await Notes.findById(noteId);
    if (!data) {
      throw new Error("An error occured while fetching data");
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured while fetching data" });
  }
});

//  create a note
app.post("/api/notes", async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = await Notes.create({ title, description });
    if (!data) {
      throw new Error("An error occured while creating data");
    }
    res.status(201).json(data);
  } catch (err) {
    console.log(err);
    res.status(509).json({ err: "An occured while creating notes" });
  }
});

// Update a note
app.put("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;
    const data = await Notes.findByIdAndUpdate(noteId, { title, description });
    if (!data) {
      throw new Error("An error occured while updating data");
    } else {
      res.status(201).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured while updating data" });
  }
});

//  delete a note

app.delete("/api/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;

    const data = await Notes.findByIdAndDelete(noteId);
    if (!data) {
      throw new Error("An error occured while deleting data");
    } else {
      res.status(201).json(data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occured while deleting data" });
  }
});

app.listen(PORT, () => {
  console.log(`port ${PORT} has started running`);
});
