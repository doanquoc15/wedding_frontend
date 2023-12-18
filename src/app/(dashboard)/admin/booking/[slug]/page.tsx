"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";

import { getAllDish } from "@/services/menu-item";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import SearchInFilter from "@/components/common/SearchInFilter";
import { formatMoney } from "@/utils/formatMoney";

const CreateBookingPage = () => {
  //useState
  const [search, setSearch] = useState<string>("");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [addDishe, setAddDishe] = useState<any[]>([]);

  //const
  const dispatch = useAppDispatch();

  //get all food
  const fetchMenuItemTypeDish = async () => {
    try {
      const { menus } = await getAllDish({ pageSize: 100, search });
      setMenuItems(menus);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  //convert foob by typeName
  function groupDishesByType(dishes) {
    const groupedDishes = dishes.reduce((acc, dish) => {
      const { typeId, typeDish, ...rest } = dish;
      const { id, typeName } = typeDish;

      const foundType = acc.find((group) => group.typeName === typeName);
      const dishInfo = { id, ...rest };

      if (foundType) {
        foundType.dishes.push(dishInfo);
      } else {
        acc.push({
          typeName: typeName,
          dishes: [dishInfo],
        });
      }

      return acc;
    }, []);

    return groupedDishes;
  }

  //handle click dish
  const handleClickDish = (dish: any) => {
    setAddDishe(prev => [...prev, dish]);
  };

  console.log(JSON.stringify(addDishe));

  //useEffect
  useEffect(() => {
    fetchMenuItemTypeDish();
  }, []);
  return (
    <form className="flex">
      {/*page information */}
      <div className="w-2/3">

      </div>

      {/*page add dish*/}
      <div className="w-1/3">
        <SearchInFilter
          // onSearch={handleSearch}
          isResetAll={true}
          width="450px"
        />
        <div className="overflow-auto sticky w-full">
          {groupDishesByType(menuItems).length > 0 &&
            groupDishesByType(menuItems)?.map((dish: any, index) => (
              <div key={index}>
                <div className="flex items-center justify-center max-w-full pr-3">
                  <hr className="border-[1px] border-blue-400 w-full"/>
                  <div className="font-bold text-[16px] mx-2 whitespace-nowrap">
                    {dish.typeName}
                  </div>
                  <hr className="border-[1px] border-blue-400 w-full"/>
                </div>
                {dish?.dishes?.map((menu) => (
                  <div
                    key={menu.id}
                    className="flex items-center gap-3 py-4 px-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleClickDish(menu)}
                  >
                    <Avatar
                      alt="Image food"
                      src={
                        menu.image ||
                        "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                      }
                      sx={{ width: 60, height: 60 }}
                    />
                    <div className="flex items-center">
                      <div className="flex gap-1">
                        <div className="flex flex-col gap-1 max-w-[200px]">
                          <Typography
                            variant="body1"
                            className="whitespace-nowrap text-left"
                          >
                            {menu.dishName}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="whitespace-nowrap text-left truncate w-[190px] italic"
                          >
                            <Tooltip title={menu?.description}>
                              {menu?.description || (
                                <div className="italic">Chưa có mô tả</div>
                              )}
                            </Tooltip>
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="block"
                          width={150}
                        >
                          Giá: {formatMoney(menu?.price)} VND
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </form>
  );
};

export default CreateBookingPage;