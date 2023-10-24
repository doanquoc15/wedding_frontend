"use client";
import React, { useEffect, useState } from "react";
import { Typography, Button, Avatar, Checkbox } from "@mui/material";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { useAppDispatch } from "@/stores/hook";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { getMenuComboById } from "@/services/combo";
import { breadCrumbReducer } from "@/stores/reducers/breadCrumb";
import { removeDuplicatesByField } from "@/utils/removeFieldObjDuplicate";
import ButtonBtn from "@/components/common/Button";
import { getDecimal } from "@/utils/getDecimal";
import { formatMoney } from "@/utils/formatMoney";
import { formatDecimal } from "@/utils/formatDecimal";
import CheckBox from "@/components/common/Checkbox";
import { getAllTypeDish } from "@/services/type-dish";
import SearchInFilter from "@/components/common/SearchInFilter";
import { getAllFood } from "@/services/menu-item";
import { getQueryParam } from "@/utils/route";

const DetailMenu = () => {
  //useState
  const [menuData, setMenuData] = useState<any>();
  const [dataCombo, setDataCombo] = useState<any>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<any>();
  const [search, setSearch] = useState<any>(getQueryParam("search"));

  //const
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const id = pathname?.split("-")[pathname?.split("-").length - 1];
  const breadCrumbs = localStorage.getItem("breadcrumb");

  //function
  const groupComboItemsByTypeName = (comboItems) => {
    const itemsByType = {};

    comboItems?.map((comboItem) => {
      const typeName = comboItem.menuItem.typeDish.typeName;
      if (!itemsByType[typeName]) {
        itemsByType[typeName] = [];
      }
      itemsByType[typeName].push(comboItem);
    });

    const itemsGroupedByType = Object.keys(itemsByType).map((typeName) => ({
      typeName,
      menuItems: itemsByType[typeName],
    }));

    return itemsGroupedByType;
  };

  const calculatorPrice = (menuData) => {
    let price = 0;
    menuData?.forEach((item) => {
      price += getDecimal(item.totalPrice);
    });
    return price;
  };

  const handleCheckboxClick = () => {
    return 1;
  };

  const handleClickEdit = () => {
    setIsEdit(true);
  };

  const fetchMenuItemTypeDish = async () => {
    try {
      const res = await getAllFood({ pageSize: 100, search });
      setMenuItems(res?.menus);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleIncrease = (item) => {
    item.quantity += 1;
  };

  const handleDecrease = (item) => {
    if (item.quantity > 0) {
      item.quantity -= 1;
    }
  };

  const fetchMenuCombo = async () => {
    try {
      const res = await getMenuComboById(
        Number(pathname?.split("-")[pathname?.split("-").length - 1])
      );
      setMenuData(res.comboItems);
      setDataCombo(res);
      const brCrumbs = breadCrumbs && JSON.parse(breadCrumbs);

      dispatch(
        breadCrumbReducer.actions.setBreadCrumbs({
          routes: [
            ...removeDuplicatesByField(
              [
                ...brCrumbs,
                {
                  href: "/",
                  name: "Chi tiết",
                },
              ],
              "name"
            ),
          ],
        })
      );
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const handleSearch = (keySearch: string) => {
    setSearch(keySearch);
  };

  const organizeDishesByType = (menuItems) => {
    const dishesByType = {};

    menuItems?.map((dish) => {
      const typeId = dish.typeDish.id;

      if (!dishesByType[typeId]) {
        dishesByType[typeId] = {
          typeName: dish.typeDish.typeName,
          dishes: [],
        };
      }

      dishesByType[typeId].dishes.push(dish);
    });

    return Object.values(dishesByType);
  };

  //useEffect
  useEffect(() => {
    id && fetchMenuCombo();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(breadCrumbReducer.actions.resetBreadCrumb());
    };
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    fetchMenuItemTypeDish();
    //eslint-disable-next-line
  }, [search]);

  return (
    <div className="flex flex-col gap-5">
      {isEdit && (
        <div className="flex w-full gap-20">
          <SearchInFilter
            onSearch={handleSearch}
            isResetAll={true}
            width="480px"
          />
          <div className="flex gap-20 items-center">
            <p className="text-[19px] text-red-400 font-bold">
              {dataCombo?.comboName}
            </p>
            <p className="italic text-[13px]">
              "Những Món Ngon Đặc Biệt Cho Những Người Đặc Biệt"
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center w-full text-[--clr-gray-500] overflow-auto max-h-[500px]">
        <div className="max-h-[500px] text-center w-3/8 overflow-auto">
          {isEdit ? (
            <div className="overflow-auto sticky">
              {organizeDishesByType(menuItems).length > 0 &&
                organizeDishesByType(menuItems)?.map((dish: any, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-center max-w-full pr-3">
                      <hr className="border-[1px] border-blue-400 w-full" />
                      <p className="font-bold text-[16px] mx-2 whitespace-nowrap">
                        {dish.typeName}
                      </p>
                      <hr className="border-[1px] border-blue-400 w-full" />
                    </div>
                    {dish?.dishes?.map((menu) => (
                      <div
                        key={menu.id}
                        className="flex items-center gap-3 mb-6"
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
                          <div className="flex flex-col gap-1 min-w-[200px]">
                            <Typography
                              variant="body2"
                              className="whitespace-nowrap text-left"
                            >
                              {menu.dishName}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              className="block"
                              width={150}
                            >
                              Giá: {formatDecimal(menu.price)} VND
                            </Typography>
                          </div>

                          <div className="flex items-center ml-2 gap-2 mr-4">
                            <Button
                              disabled={!isEdit}
                              variant="outlined"
                              className="text-black"
                              onClick={() => handleDecrease(menu)}
                            >
                              -
                            </Button>
                            <Typography variant="body2" className="mx-4">
                              {menu.quantity}
                            </Typography>
                            <Button
                              disabled={!isEdit}
                              variant="outlined"
                              onClick={() => handleIncrease(menu)}
                            >
                              +
                            </Button>
                          </div>
                          <CheckBox
                            disabled={!isEdit}
                            name="food"
                            label={""}
                            onChange={handleCheckboxClick}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ) : (
            <>
              <p className="text-[22px] font-[800]">Sky View - Restaurant</p>
              <p className="italic">
                "Những Món Ngon Đặc Biệt Cho Những Người Đặc Biệt"
              </p>
              <p className="text-[19px] text-red-400 font-bold py-[30px]">
                {dataCombo?.comboName}
              </p>
              <Image
                src="https://sdl.thuathienhue.gov.vn/UploadFiles/TinTuc/banh_mi.jpg"
                alt="image food"
                width={400}
                height={0}
              />
            </>
          )}
        </div>
        <div className="max-h-[500px] items-center ml-5 p-6 w-5/8 overflow-auto">
          <div className="sticky">
            {groupComboItemsByTypeName(menuData)?.map((item, index) => (
              <div key={index}>
                <p className="mb-5 text-[16px] font-semibold text-blue-400">
                  {index + 1}. {item?.typeName}
                </p>
                {item?.menuItems?.map((data, index) => (
                  <div key={index} className="flex items-center gap-5 mb-6">
                    <Avatar
                      alt="Image food"
                      src={
                        data.menuItem.image ||
                        "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                      }
                      sx={{ width: 100, height: 100 }}
                    />
                    <div className="flex items-center">
                      <div className="flex flex-col min-w-[350px] gap-1">
                        <Typography variant="h6">
                          {data?.menuItem?.dishName}
                        </Typography>
                        <Typography variant="body2" className="max-w-[300px]">
                          {data?.menuItem?.description || "undefined"}
                        </Typography>
                      </div>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        className="block"
                        width={150}
                      >
                        Giá: {formatDecimal(data.totalPrice)} VND
                      </Typography>
                      <div className="flex items-center ml-2 gap-2 mr-4">
                        <Button
                          disabled={!isEdit}
                          variant="outlined"
                          className="text-black"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </Button>
                        <Typography variant="body2" className="mx-4">
                          {data.quantity}
                        </Typography>
                        <Button
                          disabled={!isEdit}
                          variant="outlined"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </Button>
                      </div>
                      <CheckBox
                        disabled={!isEdit}
                        name="food"
                        label={""}
                        onChange={handleCheckboxClick}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <ButtonBtn onClick={handleClickEdit}>
            {!isEdit ? "Chỉnh sửa" : "Hủy bỏ"}
          </ButtonBtn>
          {isEdit && (
            <ButtonBtn onClick={handleClickEdit}>Lưu kết quả</ButtonBtn>
          )}
        </div>
        <p>
          Tổng tiền: <span>{formatMoney(calculatorPrice(menuData))}</span>
        </p>
      </div>
    </div>
  );
};

export default DetailMenu;
