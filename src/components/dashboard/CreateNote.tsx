import * as React from "react";

import { Box, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, Typography } from "@mui/material";

import { Add as AddIcon } from "@mui/icons-material";

import { useNotes } from "@/components/context/NotesContext";





export const CreateNote: React.FC<{
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
  open, setOpen
}) => {

  const { isLoading, error, addNote } = useNotes();

  const [note, setNote] = React.useState<string>("");





  const handleClick = async () => {
    await addNote(note);
    setOpen(false);
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
        <Box>
          <Button
            variant="contained"
            loading={isLoading}
            startIcon={<AddIcon />}
            onClick={() => {
              handleClick();
            }}
          >
            ADD NOTE
          </Button>
          {error && <Typography variant="body2" color="error">Error occured</Typography>}
        </Box>
      </DialogActions>
    </Dialog>
  );
}