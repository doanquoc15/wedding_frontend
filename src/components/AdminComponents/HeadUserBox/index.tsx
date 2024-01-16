import { useRef, useState } from "react";
import NextLink from "next/link";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import InboxTwoToneIcon from "@mui/icons-material/InboxTwoTone";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import AccountTreeTwoToneIcon from "@mui/icons-material/AccountTreeTwoTone";
import { useRouter } from "next/navigation";

import { getUserLocal } from "@/services/getUserLocal";
import { CookiesStorage } from "@/shared/config/cookie";
import { LocalStorage } from "@/shared/config/localStorage";
import { LogoutAPI } from "@/services/auth";
import { usersReducer } from "@/stores/reducers/user";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserBox() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [user, _] = useState<any>(getUserLocal());

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleLogout = async () => {
    try {
      CookiesStorage.clearCookieData("token");
      CookiesStorage.clearCookieData("role");
      LocalStorage.remove("user");
      await LogoutAPI({});
      dispatch(usersReducer.actions.setStatus());
      router.push("/dang-nhap");
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error.data.message));
    }
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="flex gap-2 items-center cursor-pointer"
        color="secondary"
        ref={ref}
        onClick={handleOpen}
      >
        <Avatar
          alt={user?.name}
          src={user?.image}
          className="border-gray-200 border-[1px]"
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }}/>
        </Hidden>
      </div>
      <Popover
        anchorEl={ref?.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar alt={user?.name} src={user?.avatar}/>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.name}</UserBoxLabel>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }}/>
        <List sx={{ p: 1 }} component="nav">
          <NextLink href="/management/profile" passHref>
            <ListItem button>
              <AccountBoxTwoToneIcon fontSize="small"/>
              <ListItemText primary="My Profile"/>
            </ListItem>
          </NextLink>
          <NextLink href="/applications/messenger" passHref>
            <ListItem button>
              <InboxTwoToneIcon fontSize="small"/>
              <ListItemText primary="Messenger"/>
            </ListItem>
          </NextLink>
          <NextLink href="/management/profile/settings" passHref>
            <ListItem button>
              <AccountTreeTwoToneIcon fontSize="small"/>
              <ListItemText primary="Account Settings"/>
            </ListItem>
          </NextLink>
        </List>
        <Divider/>
        <Box sx={{ m: 1 }} onClick={handleLogout}>
          <Button color="primary" fullWidth>
            <LockOpenTwoToneIcon sx={{ mr: 1 }}/>
            Đăng xuất
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default HeaderUserBox;
