"use client";
import * as React from "react";

import { Container, Stack } from "@mui/material";
import { Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";

import TaskList from "@/components/dashboard/NoteList";
import CreateNote from "@/components/dashboard/CreateNote";
import { useAuth } from "@/components/context/AuthContext";





export default function Home() {
  const { user } = useAuth();
  const [openCreateNoteDialog, setOpenCreateNoteDialog] = React.useState<boolean>(false);





  return (
    <Container maxWidth="xs" sx={{ py: 2 }}>
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ px: 2, py: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>Welcome, {user?.name ?? ""} !</Typography>
            <Typography>Email: {user?.email ?? ""}</Typography>
          </Stack>
        </Paper>

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={() => setOpenCreateNoteDialog(true)}
        >
          Create Note
        </Button>

        <CreateNote open={openCreateNoteDialog} setOpen={setOpenCreateNoteDialog} />
        <TaskList />
      </Stack>
    </Container>
  );
}