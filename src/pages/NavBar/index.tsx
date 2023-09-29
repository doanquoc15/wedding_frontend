import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Image from "next/image";
import logo_sky_view from "@/statics/images/logo-c-skyview.png";
import Link from "next/link";
import style from "@/styles/navbar.module.scss";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const pages = [
  "Trang chủ",
  "Giới thiệu",
  "Trãi nghiệm",
  "Menu",
  "Dịch vụ",
  "Đặt dịch vụ",
  "Tin tức",
  "Liên hệ",
  "Tiệc đã tổ chức",
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      style={{ background: "white" }}
      position="static"
      className=" text-gray-700"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src={logo_sky_view}
            width={50}
            height={50}
            priority={true}
            alt="Logo sky view restaurant"
          />
          <Box
            className={`${style.navbar}`}
            sx={{ flexGrow: 1, display: "flex", gap: 4 }}
          >
            {pages.map((page, index) => (
              <Link key={index} href="/">
                {page}
              </Link>
            ))}
          </Box>
          <div className="flex gap-10">
            <Box
              sx={{
                display: "flex",
                gap: 2,
              }}
            >
              <Tooltip title="Email">
                <IconButton>
                  <Badge badgeContent={10} color="primary">
                    <EmailOutlinedIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notification(s)">
                <IconButton>
                  <Badge badgeContent={2} color="primary">
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="avatar of customer"
                    src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "52px", marginLeft: "10px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
