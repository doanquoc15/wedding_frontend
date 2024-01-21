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
import { Container, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/legacy/image";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";

import { SignUpType } from "@/types/common";
import LoadingButton from "@/components/common/Loading";
import { SignUpAPI } from "@/services/auth";
import { signInSchema } from "@/libs/validation/signupSchema";
import Restaurant_gif from "@/statics/images/animation_restaurant.gif";
import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpType>({ resolver: yupResolver(signInSchema) });

  //ueState
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(true);
  const router = useRouter();

  //variable
  const dispatch = useAppDispatch();

  const onSubmit: any = async (values: SignUpType) => {
    try {
      const data = await SignUpAPI(values);
      router.push("/dang-nhap");
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.message));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <CssBaseline/>
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
                fullWidth
                name="name"
                label="Tên đăng nhập"
                type="text"
                id="name"
                error={!!errors?.name}
                helperText={errors?.name && errors?.name?.message}
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
                type={showPassword ? "password" : "text"}
                id="password"
                autoComplete="current-password"
                error={!!errors?.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                {...register("confirmPassword")}
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Xác thực mật khẩu"
                type={showConfirmPassword ? "password" : "text"}
                id="confirm password"
                autoComplete="current-password"
                error={!!errors?.confirmPassword}
                helperText={
                  errors?.confirmPassword && errors?.confirmPassword?.message
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {showPassword ? <VisibilityOutlinedIcon/> : <VisibilityOffOutlinedIcon/>}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                startIcon={isSubmitting && <LoadingButton/>}
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
              height={710}
              width={1000}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
