import { Box } from "@mui/material";

import HeaderNotifications from "@/components/AdminComponents/Notifications";

function NotificationBadge() {
  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications/>
      </Box>
    </Box>
  );
}

export default NotificationBadge;
