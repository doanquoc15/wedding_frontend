import { Badge, Box, styled, useTheme } from "@mui/material";
import Link from "next/link";
import Image from "next/legacy/image";

import logo_sky_view_footer from "@/statics/images/logo_ft.png";

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 52px;
        height: 38px;
`
);

function Logo() {
  const theme = useTheme();

  return (

    <LogoWrapper href="/">
      <Badge
        sx={{
          ".MuiBadge-badge": {
            fontSize: theme.typography.pxToRem(11),
            right: -2,
            top: 8
          }
        }}
        overlap="circular"
        color="success"
        badgeContent="1.0"
      >
        <LogoSignWrapper>
          <section className="w-[50px] rounded-[50%] overflow-hidden">
            <Image
              src={logo_sky_view_footer}
              alt="Logo sky view restaurant"
              width={50}
              height={50}
              priority={true}
            />
          </section>
        </LogoSignWrapper>
      </Badge>
    </LogoWrapper>
  );
}

export default Logo;
