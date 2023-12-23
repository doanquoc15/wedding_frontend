import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { usePathname, useRouter } from "next/navigation";

import stylesCommon from "@/constants/style";
import { TabPanelProps } from "@/types/common";
import { getQueryParam } from "@/utils/route";

import style from "./style.module.scss";

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const { data } = props;
  const [value, setValue] = React.useState<any>(Number(getQueryParam("tab")) || 0);
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(`${pathname}?tab=${newValue}`);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className={style.tabs}
          sx={{
            "& .MuiTab-root": {
              fontFamily: stylesCommon.fontFamily,
              fontSize: 14,
              fontWeight: 700,
              color: "var(--clr-gray-400)",
              borderBottom: "1px solid",
              borderColor: "#E8E5E5",
            },
            "& .MuiTabs-scroller": {
              overflow: "auto !important"
            }
          }}>
          {
            data?.map((item, index) => (
              <Tab
                label={item.label}
                icon={item.icon}
                disabled={item.disable}
                iconPosition="start"
                sx={{
                  "&.Mui-selected": {
                    path: {
                      fill: "var(--clr-blue-400)",
                      stroke: "var(--clr-blue-400)",
                    },
                  },
                  gap: "4px",
                }}
                key={item.id || index}/>
            ))
          }
        </Tabs>
      </Box>
      {
        data?.map(item => (
          <CustomTabPanel value={value} index={item.id} key={item.id}>
            {item.componentContent}
          </CustomTabPanel>
        ))
      }
    </Box>
  );
}
