"use client";
import React, { useState, useEffect } from "react";
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
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Link from "next/link";
import { useRouter } from "next/navigation";

import style from "@/styles/navbar.module.scss";
import logo_sky_view from "@/statics/images/logo-c-skyview.png";
import { dataPages } from "@/data";
import { LocalStorage } from "@/shared/config/localStorage";
import { CookiesStorage } from "@/shared/config/cookie";
import { useAppDispatch, useAppSelector } from "@/stores/hook";
import statusAPI, { statusApiM, statusApiReducer } from "@/stores/reducers/statusAPI";
import { LogoutAPI } from "@/services/auth";
import { selectDef } from "@/stores/reducers/dependence";

import { shortName } from "./../../utils/shortName";

function NavBar() {
  //useState
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [selectedItem, setSelectedItem] = useState<any>(
    JSON.parse(LocalStorage.get("selectedItem") as string)
  );

  const [isHeaderFixed, setHeaderFixed] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  //constant
  const dispatch = useAppDispatch();
  const router = useRouter();
  const def = useAppSelector(selectDef());

  //function
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleItemClick = (index: any) => {
    setSelectedItem(JSON.stringify(index));
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHeaderFixed(true);
    } else {
      setHeaderFixed(false);
    }
  };

  const handleFixedHeader = () => {
    if (isHeaderFixed) return "fixed";
    return "sticky";
  };

  //useEffect

  useEffect(() => {
    LocalStorage.add("selectedItem", JSON.stringify(selectedItem));
  }, [selectedItem]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const cookieRole = CookiesStorage.getCookieData("role");
  useEffect(() => {
    const savedUser = LocalStorage.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [def]);

  return (
    <AppBar
      style={{ background: "white", color: "var(--clr-gray-500)", zIndex: 1 }}
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
              {dataPages.map((page, index) => (
                <Link
                  replace
                  style={{ color: "var(--clr-gray-500)" }}
                  className={`whitespace-nowrap ${
                    index === +selectedItem && style.navbarItem
                  } ${index === +selectedItem && style.selected}`}
                  onClick={() => handleItemClick(index)}
                  key={index}
                  href={page.link}
                >
                  {page.title}
                </Link>
              ))}
            </Box>
            <div className="flex gap-10 items-center">
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  alignItems:"center"
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
                <Tooltip title={cookieRole && "Open settings"}>
                  <Box
                    onClick={handleOpenUserMenu}
                    sx={{ display: "flex", gap: 1, alignItems: "center", cursor: "pointer" }}
                  >{cookieRole ? 
                      <div onClick={() => router.push("/tai-khoan")} className="flex items-center gap-3"><IconButton sx={{ p: 0 }}>
                        <Avatar
                          className="border-[1px] border-gray-100"
                          alt="avatar of customer"
                          src={user?.image || "https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"}
                        />
                      </IconButton>
                      <Typography>{shortName(user?.name)}</Typography></div> : <div className="flex items-center">
                        <Link className="cursor-pointer" href="/dang-nhap">Đăng nhập </Link>
                       / <Link className="cursor-pointer" href="/dang-ky">Đăng ký</Link>
                      </div>}
                  </Box>
                </Tooltip>
                {/*{
                  cookieRole && <Menu
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
                  >*/}
                {/*{dataSettings.map((setting, index) => (
                      <MenuItem
                        className="pl-8 whitespace-nowrap"
                        key={index}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center" onClick = {() => handleClickSetting(setting)}>{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>*/}
                {/*}*/}
              </Box>
            </div>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
