import mongoose from "mongoose";



const NoteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});



export const NotesModel = mongoose.models.Note || mongoose.model("Note", NoteSchema);