import { Container, Stack } from "@mui/material";
import { Paper, Typography } from "@mui/material";
import { Button } from "@mui/material";

import TaskList from "@/components/dashboard/TaskList";





const user = {
  name: "Jonas Kahnwald",
  email: "xxxxxx@xxxx.com",
};





export default function Home() {
  return (
    <Container maxWidth="xs" sx={{ py: 2 }}>
      <Stack spacing={3}>
        <Paper elevation={3} sx={{ px: 2, py: 3 }}>
          <Stack spacing={1}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>Welcome, {user.name} !</Typography>
            <Typography>Email: {user.email}</Typography>
          </Stack>
        </Paper>

        <Button variant="contained" size="large" fullWidth>Create Note</Button>

        <TaskList />
      </Stack>
    </Container>
  );
}