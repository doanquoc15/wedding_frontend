import { Typography } from "@mui/material";

interface IPageHeader {
  title: string
}

function PageHeader(props: IPageHeader) {
  return (
    <div className="h-[100px] shadow-zinc-500 bg-amber-100 w-full flex items-center p-3 mb-7">
      <Typography variant="h3" component="h3">
        {props?.title}
      </Typography>
      <Typography variant="subtitle2">

      </Typography>
    </div>
  );
}

export default PageHeader;
