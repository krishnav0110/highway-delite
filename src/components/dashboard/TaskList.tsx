import { Stack, Typography, Paper, IconButton } from "@mui/material";

import { DeleteOutline as DeleteIcon } from "@mui/icons-material";





const notes = [
  { data: "Note 1 asd  asdf as fas dfas df as asdf as as dfas da sd asdfas gas sa  asdf asdf asdf as fas fas fas dfas fas asd fas fas dfa sdf swaf asdfas fas fa sfa sf" },
  { data: "Note 2" },
  { data: "Note 3" },
];





export default function TaskList () {
  return (
    <Stack spacing={1}>
      <Typography>Notes</Typography>
      {notes?.map((note, index) => (
        <Paper elevation={3} key={index}>
          <Stack direction="row" spacing={2} sx={{ p: 1, pl: 2, alignItems: "center" }}>
            <Typography sx={{ flex: 1 }}>
              {note.data}
            </Typography>

            <IconButton color="inherit" sx={{ alignSelf: "start" }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
}