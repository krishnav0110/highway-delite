"use client";
import * as React from "react";

import { Stack, Typography } from "@mui/material";
import { useAuth } from "@/components/context/AuthContext";

import Note from "./Note";





export default function TaskList () {
  const { user } = useAuth();
  const [notes, setNotes] = React.useState<{}[]>([]);
  const [error, setError] = React.useState<boolean>(false);





  React.useEffect(() => {
    if (!user) {
      return;
    }
    setError(false);

    const fetchNotes = async () => {
      try {
        const res = await fetch(`/api/notes/${user._id}`);
        if (res.status !== 200) {
          setError(true);
        }
        setNotes(await res.json());
      }
      catch (error) {
        console.error(error);
        setError(true);
      }
    };
    fetchNotes();
  }, [user]);





  return (
    <Stack spacing={1}>
      <Typography>Notes</Typography>
      {notes?.map((note, index) => (
        <Note key={index} note={note} />
      ))}
      {error && <Typography>Error occured while fetching Notes</Typography>}
    </Stack>
  );
}