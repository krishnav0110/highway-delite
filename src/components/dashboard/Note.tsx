"use client";
import * as React from "react";
import { Stack, Typography, Paper, IconButton } from "@mui/material";

import { DeleteOutline as DeleteIcon } from "@mui/icons-material";

import { NoteType } from "@/lib/types";
import { useNotes } from "@/components/context/NotesContext";





export const Note: React.FC<{note: NoteType}> = ({ note }) => {

  const { isLoading, deleteNote } = useNotes();



  const handleDelete = async () => {
    await deleteNote(note);
  };





  return (
    <Paper elevation={3}>
      <Stack direction="row" spacing={2} sx={{ p: 1, pl: 2, alignItems: "center" }}>
        <Typography sx={{ flex: 1 }}>
          {note.data ?? "note"}
        </Typography>

        <IconButton
          color="inherit"
          sx={{ alignSelf: "start" }}
          loading={isLoading}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Paper>
  );
}