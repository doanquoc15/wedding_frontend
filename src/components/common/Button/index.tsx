import { Button as MUIButton, ButtonProps } from "@mui/material";
import React from "react";

import { CustomButtonProps } from "@/types/common";

export default function Button(props: ButtonProps & CustomButtonProps) {
  const { height, bg, color, width, sx: style, children, ...buttonProps } = props;

  return (
    <MUIButton
      sx={{
        "&.MuiButton-root": {
          background: bg ? bg : "var(--clr-blue-400)",
          color: color ? color : "var(--clr-white)",
          display: "flex",
          alignItems: "center",
          border: "1px solid transparent",
          fontSize: "13px",
          lineHeight: "1.5rem",
          minHeight: height || 40,
          borderRadius: "3px",
          width: width || "auto",
          minWidth: width || "auto",
          ...style,
        },
        "&.Mui-disabled": {
          background: "var(--clr-white-450)",
          color: "var(--clr-gray-250)",
          boxShadow: 0,
        },
        "&.MuiButton-root:hover": {
          opacity: "0.9",
        },
        ...style,
      }}
      {...buttonProps}
    >
      {children}
    </MUIButton>
  );
}
