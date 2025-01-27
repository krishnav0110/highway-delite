"use client";
import * as React from "react";
import { Stack, Typography, Paper, IconButton } from "@mui/material";

import { DeleteOutline as DeleteIcon } from "@mui/icons-material";





export default function Note ({ note }: { note: { _id: string, userId: string, data: string } }) {
  const [isLoading, setLoading] = React.useState<boolean>(false);



  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/notes/${note.userId}/${note._id}`, {
        method: "DELETE"
      });

      if (res.status !== 200) {
        console.error("Server Error: Couldnt delete note");
      }
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false);
    }
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