"use client";
import * as React from "react";

import { Paper, Stack } from "@mui/material";
import { Typography, CircularProgress } from "@mui/material";

import { useNotes } from "@/components/context/NotesContext";

import { Note } from "./Note";





export const NoteList: React.FC = () => {

  const { notes, isLoading, error } = useNotes();





  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Stack sx={{ alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center">Error occured while fetching Notes</Typography>
    );
  }

  if (!isLoading && notes?.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" textAlign="center">No Notes</Typography>
        <Typography color="info" textAlign="center">Start by creating notes</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={1}>
      {notes?.map((note, index) => (
        <Note key={index} note={note} />
      ))}
    </Stack>
  );
}