import * as React from "react";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

export default function RatingCustom(props) {
  const { rating } = props;
  return (
    <Stack spacing={1}>
      <Rating name="half-rating-read" defaultValue={rating || 0} precision={0.5} readOnly/>
    </Stack>
  );
}