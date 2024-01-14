import { alpha, Box, List, ListSubheader, styled } from "@mui/material";
import BrightnessLowTwoToneIcon from "@mui/icons-material/BrightnessLowTwoTone";
import { usePathname, useRouter } from "next/navigation";
import Person3Icon from "@mui/icons-material/Person3";
import BallotIcon from "@mui/icons-material/Ballot";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ChecklistIcon from "@mui/icons-material/Checklist";
import BadgeIcon from "@mui/icons-material/Badge";

import ButtonBtn from "@/components/common/Button";

export const MENU_SIDEBAR_LIST = [
  {
    id: 1,
    title: "Thống kê",
    link: "/admin/dashboard",
    icon: <QueryStatsIcon/>
  },
  {
    id: 2,
    title: "Quản lý tài khoản",
    link: "/admin/users",
    icon: <Person3Icon/>
  }, {
    id: 3,
    title: "Đơn hàng",
    link: "/admin/booking",
    icon: <BallotIcon/>

  }, {
    id: 4,
    title: "Dịch vụ",
    link: "/admin/services",
    icon: <BrightnessLowTwoToneIcon/>

  }, {
    id: 5,
    title: "Menu combo",
    icon: <RestaurantMenuIcon/>,
    link: "/admin/combo",
  }, {
    id: 6,
    title: "Món ăn",
    link: "/admin/dishes",
    icon: <FastfoodIcon/>
  }, {
    id: 6,
    title: "Loại món ăn",
    link: "/admin/type-dish",
    icon: <ChecklistIcon/>
  }, {
    id: 6,
    title: "Nhân viên",
    link: "/admin/employee",
    icon: <BadgeIcon/>
  },

];
const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      color: white;
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .Muidiv-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: white;
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .Muidiv-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
    "transform",
    "opacity"
  ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const currentRoute: any = usePathname();
  const router = useRouter();

  const closeSidebar = (link: string) => {
    router.push(link);
  };

  return (
    <>
      <MenuWrapper>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              User
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              {
                MENU_SIDEBAR_LIST.map((item, index) => (
                  <div className="mb-2" key={index}>
                    <ButtonBtn
                      className={
                        currentRoute?.includes(item?.link) ? "active" : ""
                      }
                      bg={currentRoute?.includes(item?.link) ? "var(--clr-blue-400)" : "transparent"}
                      width="100%"
                      style={{
                        color: "var(--clr-gray-100)",
                        display: "flex",
                        justifyContent: "flex-start",
                        paddingLeft: "25px"
                      }}
                      disableRipple
                      component="a"
                      onClick={() => closeSidebar(item?.link)}
                      startIcon={item?.icon}
                    >
                      {item?.title}
                    </ButtonBtn>
                  </div>
                ))
              }
            </List>
          </SubMenuWrapper>
        </List>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
