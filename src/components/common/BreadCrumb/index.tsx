"use client";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useRouter } from "next/navigation";

export interface IRoute {
  name: string;
  href: string;
  noTrans?: boolean;
  id?: number;
}

export interface IProps {
  headTitle?: string;
  tabTitle?: string;
  paramsReplace?: Array<string>;
  routes?: any;
  pageTitle?: string;
}

const Breadcrumb = (props: IProps) => {
  const routes = props.routes;
  const router = useRouter();

  if (!routes || routes.length === 0) return <></>;

  const handlerNavigate = (path: string) => {
    if (window.location.pathname === path) return;
    if (path) {
      router.push(path);
    }
  };

  return (
    <div className="flex flex-col justify-evenly font-primary h-[52px]">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          ".MuiBreadcrumbs-separator": {
            margin: 0,
          },
        }}
      >
        {routes.map((route: IRoute, index: number) => (
          <Link
            key={index}
            underline={index === routes.length - 1 ? "none" : "hover"}
            onClick={() => handlerNavigate(route.href)}
            sx={{
              color: "var(--clr-gray-500)",
              fontSize: "13px",
              padding: "0px 8px",
              textTransform: "capitalize",
              cursor: index === routes.length - 1 ? "default" : "pointer",
              fontWeight: index === routes.length - 1 ? 700 : 400,
              "&:hover": {
                textDecoration: "none",
              },
              "&.MuiTypography-root.MuiTypography-inherit.MuiLink-root": {
                paddingLeft: index !== 0 ? "" : "0 !important",
              },
            }}
          >
            {route.noTrans !== undefined && route.noTrans
              ? route.name + " " + route.id
              : route.name}
          </Link>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
