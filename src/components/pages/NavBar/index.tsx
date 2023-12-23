"use client";

import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useSelector } from "react-redux";

import style from "@/styles/navbar.module.scss";
import { selectStatus, usersReducer } from "@/stores/reducers/user";
import { SocketContext } from "@/context/sockets";
import { getUserLocal } from "@/services/getUserLocal";
import { useAppDispatch } from "@/stores/hook";
import { CookiesStorage } from "@/shared/config/cookie";
import { LocalStorage } from "@/shared/config/localStorage";
import logo_sky_view from "@/statics/images/logo-c-skyview.png";
import BadgeCustom from "@/components/Badge";
import { dataPages } from "@/data";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getNotificationUnRead } from "@/services/notification";
import { PATH } from "@/constants/common";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [_, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [isHeaderFixed, setHeaderFixed] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const socketIo = useContext(SocketContext);
  const id = getUserLocal()?.id;
  const [notifications, setNotifications] = useState<any[]>([]);
  const [badge, setBadge] = useState<number>(0);

  //constant
  const router = useRouter();
  const def = useSelector(selectStatus());
  const dispatch = useAppDispatch();

  const pathname = usePathname();

  //function
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    router.push(PATH.ACCOUNT);
    setAnchorElUser(event.currentTarget);
  };

  const handleScroll = () => {
    if (typeof window === "undefined") return;
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
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [def]);

  CookiesStorage.getCookieData("role");
  useEffect(() => {
    const savedUser = LocalStorage.get("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  //useEffect
  useEffect(() => {
    const savedUser = LocalStorage.get("user") && JSON.parse(LocalStorage.get("user") || "{}");

    if (!savedUser) return;
    socketIo.on("updateBadge", (authorId) => {
      fetchAllNotificationByUserId(user?.id);
      if (savedUser?.id === authorId)
        setBadge((prev) => +prev + 1);
    });

    if (socketIo)
      return () => {
        socketIo.off("updateBadge");
        socketIo.off(String(savedUser?.id));
      };
  }, [user?.id]);

  const fetchAllNotificationByUserId = async (id) => {
    try {
      const count = await getNotificationUnRead(id);
      dispatch(usersReducer.actions.setIsFetchedNotification(true));
      setBadge(count);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    }
  };

  useEffect(() => {
    if (!user) return;
    fetchAllNotificationByUserId(user?.id);
  }, [user?.id]);
  return (
    <AppBar style={{ background: "white", color: "var(--clr-gray-500)", zIndex: 1 }}
      position={handleFixedHeader()}
      className="text-gray-700">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="w-[50px] h-[50px] overflow-hidden rounded-[50%]">
            <Image
              src={logo_sky_view}
              width={50}
              height={50}
              priority={true}
              alt="Logo sky view restaurant"
              objectFit="cover"
            />
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sky View
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            SkyView
          </Typography>
          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }} className={`${style.navbar}`}>
            {dataPages.map((page) => (
              <Link
                key={page.id}
                href={page.link}
                onClick={handleCloseNavMenu}
                className={`whitespace-nowrap ${
                  page.link === pathname && style.navbarItem
                } ${page.link === pathname && style.selected}`}
              >
                {page.title}
              </Link>
            ))}
          </Box>

          {CookiesStorage.getCookieData("role") ?
            <Box sx={{ flexGrow: 1, display: "flex", gap: "20px", justifyContent: "end" }}
            >
              <BadgeCustom setBadge={setBadge} badge={badge}/>
              <Tooltip title="Tài khoản" onClick={() => router.push(PATH.ACCOUNT)}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Avatar user" defaultValue={user?.name}
                    src={user?.image || "https://inkythuatso.com/uploads/thumbnails/800/2022/03/4a7f73035bb4743ee57c0e351b3c8bed-29-13-53-17.jpg"}/>
                  <span className="ml-2 text-[15px]">{user?.name}</span>
                </IconButton>
              </Tooltip>
            </Box> :
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end", gap: "10px" }}>
              <Link href="/dang-nhap">Đăng nhập</Link>
              <Link href="/dang-ky">Đăng ký</Link>
            </Box>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
