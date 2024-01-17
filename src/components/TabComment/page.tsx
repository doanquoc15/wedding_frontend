import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Avatar } from "@mui/material";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";

import RatingCustom from "@/components/common/RatingCustom";
import SafetyPolicy from "@/components/SafetyPolicy/page";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
          <Typography>{children}</Typography>
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

export default function TabComment({ combo }) {
  console.log(combo);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Mô tả" {...a11yProps(0)} />
          <Tab label="Bình luận" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="mb-6">
          {combo?.description}
        </div>
        <hr className="py-5"/>
        <div className="flex items-center gap-2">
          <EditNoteIcon sx={{ fontSize: "30px" }}/>
          <span className="text-[17px] font-semibold">Lưu ý : </span>
        </div>
        <SafetyPolicy/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div className="flex flex-col gap-8">
          {
            combo?.bookings?.map((item, index) => (
              <div key={index}>
                {item?.feedback && <div className={"flex gap-4"}>
                  <Avatar
                    alt="user name"
                    src={item?.user?.image}
                    sx={{ width: 70, height: 70, border: "1px solid lightgray" }}
                  />
                  <div>
                    <p className="font-semibold">{item?.user?.name}</p>
                    <p><RatingCustom rating={item?.feedback?.rating}/></p>
                    <p
                      className="text-[13px] text-gray-300 italic">{moment(item?.feedback?.createdAt).format("DD-MM-YYYY")}</p>
                  </div>
                </div>}
                <p className="ml-16 mt-3">{item?.feedback?.comment}</p>
              </div>
            ))
          }
        </div>
      </CustomTabPanel>
    </Box>
  );
}