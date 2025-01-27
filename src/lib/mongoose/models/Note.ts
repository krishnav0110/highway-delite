import mongoose from "mongoose";



const NoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});



export const NotesModel = mongoose.models.notes || mongoose.model("notes", NoteSchema);