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
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";

import { SignUpType } from "@/types/common";
import LoadingButton from "@/components/common/Loading";
import { SignUpAPI } from "@/services/auth";
import { signInSchema } from "@/libs/validation/signupSchema";
import Restaurant_gif from "@/statics/images/animation_restaurant.gif";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({ resolver: yupResolver(signInSchema) });
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  //variable

  const onSubmit: any = async (values: SignUpType) => {
    try {
      const data = await SignUpAPI(values);
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
            <form className="mx-8 mt-6" onSubmit={handleSubmit(onSubmit)}>
              <Typography component="h1" variant="h5">
                Đăng ký
              </Typography>
              <TextField
                {...register("name")}
                margin="normal"
                required
                fullWidth
                name="name"
                label="Tên đăng nhập"
                type="text"
                id="name"
                error={!!errors?.name}
                helperText={errors?.confirmPassword && errors?.name?.message}
              />
              <TextField
                {...register("email")}
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                error={!!errors?.email}
                helperText={errors?.email && errors?.email?.message}
              />
              <TextField
                {...register("password")}
                margin="normal"
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors?.password}
              />

              <TextField
                {...register("confirmPassword")}
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Xác thực mật khẩu"
                type="confirm password"
                id="confirm password"
                autoComplete="current-password"
                error={!!errors?.confirmPassword}
                helperText={
                  errors?.confirmPassword && errors?.confirmPassword?.message
                }
              />

              <Button
                startIcon={isSubmit && <LoadingButton />}
                type="submit"
                fullWidth
                variant="contained"
                className="bg-blue-500"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/dang-nhap" variant="body2">
                    {"Bạn có tài khoản chưa? Đăng nhập"}
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
            sx={{ objectFit: "contain", height: "100%", overflow: "hidden" }}
          >
            <Image
              src={Restaurant_gif}
              alt="restaurant gif"
              objectFit="cover"
              width={1000}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
