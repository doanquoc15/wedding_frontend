"use client";
import React, { useState, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

import style from "@/styles/navbar.module.scss";
import logo_sky_view from "@/statics/images/logo-c-skyview.png";

const pages = [
  {
    title: "Trang chủ",
    link: "/",
  },
  {
    title: "Giới thiệu",
    link: "/introduction",
  },
  {
    title: "Trãi nghiệm",
    link: "/",
  },
  {
    title: "Menu",
    link: "/",
  },
  {
    title: "Dịch vụ",
    link: "/",
  },
  {
    title: "Đặt dịch vụ",
    link: "/",
  },
  {
    title: "Tin tức",
    link: "/",
  },
  {
    title: "Liên hệ",
    link: "/",
  },
  {
    title: "Tiệc đã tổ chức",
    link: "/",
  },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [isHeaderFixed, setHeaderFixed] = useState<Boolean>(false);

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

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleFixedHeader = () => {
    if (isHeaderFixed) return "fixed";
    return "static";
  };

  return (
    <AppBar
      style={{ background: "white" }}
      position={handleFixedHeader()}
      className="text-gray-700"
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
          <div className="flex flex-1 justify-between">
            <Box
              className={`${style.navbar}`}
              sx={{ flexGrow: 0, display: "flex", gap: 4 }}
            >
              {pages.map((page, index) => (
                <Link
                  style={{ color:"var(--clt-gray-500)" }}
                  className={`whitespace-nowrap ${style.navbarItem} ${
                    index === selectedItem ? style.selected : ""
                  }`}
                  onClick={() => handleItemClick(index)}
                  key={index}
                  href={page.link}
                >
                  {page.title}
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
                  <Box
                    onClick={handleOpenUserMenu}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <IconButton sx={{ p: 0 }}>
                      <Avatar
                        alt="avatar of customer"
                        src="https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"
                      />
                    </IconButton>
                    <Typography>Tuan</Typography>
                  </Box>
                </Tooltip>
                <Menu
                  sx={{ mt: "52px", marginLeft: "25px" }}
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
                  PaperProps={{
                    style: {
                      width: "150px",
                    },
                  }}
                >
                  {settings.map((setting, index) => (
                    <MenuItem
                      className="pl-8 whitespace-nowrap"
                      key={index}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
