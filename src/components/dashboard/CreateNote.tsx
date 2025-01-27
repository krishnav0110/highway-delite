import * as React from "react";

import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField } from "@mui/material";
import { useAuth } from "@/components/context/AuthContext";





export default function CreateNote ({ open, setOpen }: {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  const { user } = useAuth();
  const [note, setNote] = React.useState<string>("");
  const [error, setError] = React.useState<boolean>(false);





  const handleClick = async () => {
    if (!user) {
      return;
    }
    setError(false);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ userId: user._id, data: note })
      });

      if (res.status !== 201) {
        setError(true);
      }

      setOpen(false);
    }
    catch (error) {
      setError(true);
      console.error(error);
    }
  };





  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>
        Add Note
      </DialogTitle>

      <DialogContent>
        <TextField
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleClick}
        >
          ADD NOTE
        </Button>
      </DialogActions>
    </Dialog>
  );
}