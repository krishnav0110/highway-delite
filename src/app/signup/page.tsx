"use client";
import * as React from "react";
import Image from "next/image";

import { Box, Container, Stack, Grid2 } from "@mui/material";
import { Divider } from "@mui/material";
import { Button, TextField, Typography, Link } from "@mui/material";

import { GoogleIcon } from "@/components/icons/icons";

import { validateEmail, validateName, validatePassword } from "@/lib/validation";





export default function Signup() {
  const [name, setName] = React.useState<string>("");
  const [dob, setDob] = React.useState<string>("2025-07-24");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [nameErrorMsg, setNameErrorMsg] = React.useState<string>("");
  const [emailErrorMsg, setEmailErrorMsg] = React.useState<string>("");
  const [passwordErrorMsg, setPasswordErrorMsg] = React.useState<string>("");

  const [isLoading, setLoadingState] = React.useState<boolean>(false);
  const [errorMsg, setErrorMsg] = React.useState<string>("");





  const validateInputs = (name: string, email: string, password: string) => {
    let isValid = true;

    if (!validateName(name)) {
      setNameErrorMsg("Please enter a valid email address.");
      isValid = false;
    } else {
      setNameErrorMsg("");
    }

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
      name: name,
      dob: dob,
      email: email,
      password: password,
    };

    if (!validateInputs(name, email, password)) {
      return;
    }
    setLoadingState(true);



    try {
      console.log(credentials);
    }
    catch (error) {
      setErrorMsg("Invalid credentials");
      console.error(error);
    }
    finally {
      setLoadingState(false);
    }
  };





  return (
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
      <Grid2 size={{ xs: 3, md: 1 }}>
        <Container maxWidth="xs">
          <Typography variant="h4" textAlign={{ xs: "center", md: "left" }}>Sign up</Typography>
          <Typography color="textDisabled" textAlign={{ xs: "center", md: "left" }}>Sign up to enjoy the feature of HD</Typography>

            <Stack
              component="form"
              noValidate
              onSubmit={handleSubmit}
              spacing={2}
              sx={{ width: 1, mt: 3, mb: 5 }}
            >
              <TextField
                value={name}
                error={Boolean(nameErrorMsg)}
                helperText={nameErrorMsg}
                type="name"
                id="name"
                name="name"
                label="Your Name"
                autoComplete="name"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={Boolean(nameErrorMsg)? "error" : "primary"}
                sx={{ ariaLabel: "name" }}
                onChange={(event) => {
                  setName(event.currentTarget.value);
                }}
              />

              <TextField
                value={dob}
                type="date"
                id="DOB"
                name="DOB"
                label="Date of Birth"
                placeholder=""
                autoComplete="DOB"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: "DOB" }}
                onChange={(event) => {
                  setDob(event.currentTarget.value);
                }}
              />

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

              <Stack>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  loading={isLoading}
                >
                  Sign up
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
                Continue with Google
              </Button>
          </Stack>



          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            <Typography color="textDisabled">Already have an account?</Typography>
            <Link href="/signin" sx={{ fontWeight: "bold" }}>Sign in</Link>
          </Stack>
        </Container>
      </Grid2>





      <Grid2 size="grow" sx={{ display: { xs: "none", md: "flex" }, height: 1 }}>
        <Box sx={{ width: 1, height: 1, px: 15, py: 5 }}>
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
    </Grid2>
  );
}