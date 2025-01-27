"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Box, Container, Stack, Grid2 } from "@mui/material";
import { FormControlLabel, Checkbox } from "@mui/material";
import { Divider } from "@mui/material";
import { Button, TextField, Typography, Link } from "@mui/material";

import { validateEmail, validatePassword } from "@/lib/validation";

import { GoogleIcon } from "@/components/icons/icons";

import { useAuth } from "@/components/context/AuthContext";





export default function Signin() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [emailErrorMsg, setEmailErrorMsg] = React.useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState<string>("");

  const [isLoading, setLoadingState] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");





  const validateInputs = (email: string, password: string) => {
    let isValid = true;

    if (!validateEmail(email)) {
      setEmailErrorMsg("Please enter a valid email");
      isValid = false;
    } else {
      setEmailErrorMsg("");
    }

    if (!validatePassword(password)) {
      setPasswordErrorMsg("Please enter a valid password");
      isValid = false;
    } else {
      setPasswordErrorMsg("");
    }

    return isValid;
  };





  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    if (!validateInputs(email, password)) {
      return;
    }
    setLoadingState(true);



    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        body: JSON.stringify(credentials),
      });

      if (res.status !== 200) {
        setErrorMsg("Invalid credentials");
      }
      setErrorMsg("");
      login(await res.json());
      router.push("/");
    }
    catch (error) {
      setErrorMsg("Error occured");
      console.error(error);
    }
    finally {
      setLoadingState(false);
    }
  };





  return (
    <Container>
      <Grid2
        container
        columns={3}
        sx={{
          height: { xs: "initial", md: "90vh" },
          maxHeight: 800,
          mx: "auto",
          alignItems: "center",
        }}
      >
        <Grid2 size="grow" sx={{ display: { xs: "none", md: "flex" }, height: 1 }}>
          <Box sx={{ width: 1, height: 1, px: 10, py: 5 }}>
            <Image
              src="/signin_bg.jpg"
              alt="Wavy background"
              width={640}
              height={360}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 24,
                filter: "brightness(80%)",
              }}
            />
          </Box>
        </Grid2>





        <Grid2 size={{ xs: 3, md: 1 }}>
          <Container maxWidth="xs">
            <Typography variant="h4" textAlign={{ xs: "center", md: "left" }}>Sign In</Typography>
            <Typography color="textDisabled" textAlign={{ xs: "center", md: "left" }}>Please login to continue to your account</Typography>

              <Stack
                component="form"
                noValidate
                onSubmit={handleSubmit}
                spacing={2}
                sx={{ width: 1, mt: 3, mb: 5 }}
              >
                <TextField
                  value={email}
                  error={Boolean(emailErrorMsg)}
                  helperText={emailErrorMsg}
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={Boolean(emailErrorMsg)? "error" : "primary"}
                  sx={{ ariaLabel: "email" }}
                  onChange={(event) => {
                    setEmail(event.currentTarget.value);
                  }}
                />

                <Stack spacing={1}>
                  <TextField
                    value={password}
                    error={Boolean(passwordErrorMsg)}
                    helperText={passwordErrorMsg}
                    type="password"
                    id="password"
                    name="password"
                    label="OTP"
                    autoComplete="new-password"
                    autoFocus
                    required
                    variant="outlined"
                    color={Boolean(passwordErrorMsg)? "error" : "primary"}
                    sx={{ ariaLabel: "password", flex: 1 }}
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                  />

                  <Link href="" variant="body2" sx={{ fontWeight: "bold" }}>Forgot password ?</Link>
                </Stack>

                <FormControlLabel
                  control={<Checkbox />}
                  label="Keep me logged in"
                />

                <Stack>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    loading={isLoading}
                  >
                    Sign in
                  </Button>
                  {errorMsg && <Typography color="error">{errorMsg}</Typography>}
                </Stack>

                <Divider>or</Divider>

                <Button
                  variant="outlined"
                  fullWidth
                  color="inherit"
                  endIcon={<GoogleIcon />}
                  sx={{ borderColor: "divider" }}
                >
                  Sign in with Google
                </Button>
            </Stack>



            <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
              <Typography color="textDisabled">Need an account?</Typography>
              <Link href="/signup" sx={{ fontWeight: "bold" }}>Create one</Link>
            </Stack>
          </Container>
        </Grid2>
      </Grid2>
    </Container>
  );
}