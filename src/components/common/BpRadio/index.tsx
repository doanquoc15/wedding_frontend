import { Radio, RadioProps } from "@mui/material";

export default function BpRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        "& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)": {
          color: "var(--clr-gray-225)",
        },
        "& .MuiSvgIcon-root + .MuiSvgIcon-root": {
          color: "var(--clr-blue-400)",
        },
      }}
      disableRipple
      color="default"
      {...props}
    />
  );
}
