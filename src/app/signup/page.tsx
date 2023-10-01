"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { useForm } from "react-hook-form";

import { SignUpType } from "@/types/common";
import LoadingButton from "@/components/common/Loading";
import { SignUpAPI } from "@/services/auth";

export default function SignUpPage() {
  const { register, handleSubmit } = useForm();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  //variable

  const onSubmit: any = async (values: SignUpType) => {
    try {
      const data = await SignUpAPI(values);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          minHeight: "80%",
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <form className="my-8 mx-4" onSubmit={handleSubmit(onSubmit)}>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <TextField
                {...register("email")}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                {...register("password")}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <TextField
                {...register("name")}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                id="name"
              />
              <Button
                startIcon={isSubmit && <LoadingButton />}
                type="submit"
                fullWidth
                variant="contained"
                className="bg-blue-500"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Do have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Grid>
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://media.mia.vn/uploads/blog-du-lich/sky-view-restaurant-nha-hang-lang-man-ly-tuong-cho-cac-cap-doi-tai-da-nang-2-1636459839.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t: any) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </Box>
    </Container>
  );
}
