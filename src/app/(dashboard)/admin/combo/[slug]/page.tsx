"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAllDish } from "@/services/menu-item";
import { statusApiReducer } from "@/stores/reducers/statusAPI";
import { useAppDispatch } from "@/stores/hook";
import SearchInFilter from "@/components/common/SearchInFilter";
import { formatMoney } from "@/utils/formatMoney";
import TextInputField from "@/components/common/TextInputField";
import Error from "@/components/common/Error";
import TextAreaField from "@/components/common/TextAreaField";
import { getAllService } from "@/services/service";
import SelectField from "@/components/common/SelectField";
import ButtonBtn from "@/components/common/Button";
import LoadingButton from "@/components/common/Loading";
import { createComboMenu, getMenuComboById, updateComboMenu } from "@/services/combo";
import { MESSAGE_SUCCESS } from "@/constants/errors";
import { PATH } from "@/constants/common";
import { createdComboSchema } from "@/libs/validation/createdComboSchema";

const CreateBookingPage = ({ params }) => {
  //useForm
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(createdComboSchema),
    defaultValues: {
      comboName: "",
      description: "",
      serviceId: "",
    },
    mode: "all",
  });
  //useState
  const [search, setSearch] = useState<string>("");
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [serviceOption, setServiceOption] = useState<any[]>([]);
  const [checkedDishes, setCheckedDishes] = useState<{
    [key: string]: number
  }>({});
  const [comboMenu, setComboMenu] = useState<any>();
  //const
  const dispatch = useAppDispatch();
  const router = useRouter();

  //get all service
  const fetchAllService = async () => {
    setLoading(true);
    try {
      const { data, total } = await getAllService({
        pageSize: 1000
      });
      setServiceOption(data?.map(item => ({
        label: item?.serviceName,
        value: item?.id
      })) || []);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  //get all food
  const fetchAllDishes = async () => {
    try {
      const { menus } = await getAllDish({ pageSize: 100, search });
      setMenuItems(menus);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    }
  };

  const fetchComboMenuById = async (id: number) => {
    setLoading(true);
    try {
      const res = await getMenuComboById(id);
      reset({
        comboName: res?.comboName,
        description: res?.description,
        serviceId: res?.serviceId,
      });
      const convertedObject = {};

      res?.comboItems.forEach(item => {
        convertedObject[item?.menuItem?.id] = item.quantity;
      });

      setCheckedDishes(convertedObject);

      setComboMenu(res);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.message));
    } finally {
      setLoading(false);
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

  const handleSearch = (querySearch: string) => {
    setSearch(querySearch);
  };

  const handleToggleDish = (menuId, quantity) => {
    if (quantity > 0) {
      const selectedDish = menuItems.find((menu) => menu.id === menuId);
      if (selectedDish) {
        setCheckedDishes((prevChecked) => ({
          ...prevChecked,
          [menuId]: quantity,
        }));
      }
    } else {
      const { [menuId]: deleted, ...rest } = checkedDishes;
      setCheckedDishes(rest);
    }
  };

  //handleSubmit form
  const onSubmit = async (data) => {
    const listMenuItemId = Object.entries(checkedDishes);
    const comboItems = listMenuItemId.map(([id, quantity]) => ({
      menuItemId: +id,
      totalPrice: menuItems.find((menu) => menu.id === +id)?.price * quantity,
      quantity,
    }));

    const createDataCombo = {
      comboName: data?.comboName,
      description: data?.description,
      serviceId: data?.serviceId,
      comboItems
    };
    if (comboItems?.length === 0) {
      dispatch(statusApiReducer.actions.setMessageError(MESSAGE_SUCCESS.CHOOSE_FOOD));
      return;
    }
    setLoading(true);
    try {
      if (params?.slug === "new") {
        await createComboMenu(createDataCombo);
        dispatch(statusApiReducer.actions.setMessageSuccess(MESSAGE_SUCCESS.CREATE_COMBO_SUCCESS));
      } else {
        await updateComboMenu(params?.slug, createDataCombo);
        dispatch(statusApiReducer.actions.setMessageUpdate(MESSAGE_SUCCESS.UPDATED_SUCCESS));
      }
      router.push(PATH.MANAGEMENT_MENU_COMBO);
    } catch (error: any) {
      dispatch(statusApiReducer.actions.setMessageError(error?.data?.message));
    } finally {
      setLoading(false);
    }
  };

  //useEffect
  useEffect(() => {
    fetchAllDishes();
  }, [search]);

  useEffect(() => {
    fetchAllService();
  }, []);

  useEffect(() => {
    if (!params?.slug) return;
    fetchComboMenuById(params?.slug);
  }, [params?.slug]);

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      {/*page information */}
      <div className="w-2/5">
        <div className="w-full overflow-auto flex flex-col gap-7 sticky">
          <div className="w-full">
            <label className="text-[#333] font-semibold">Tên menu</label>
            <div className="w-[450px]">
              <TextInputField
                name="comboName"
                label=""
                control={control}
                inputProps={{
                  className: "border-0 h-full p-0 px-3",
                  maxLength: 256,
                }}
                className="w-full max-h-[40px] input-custom"
                error={!!errors?.comboName}
                helperText={
                  errors?.comboName && (
                    <Error message={errors?.comboName?.message as string}/>
                  )
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#333] font-semibold">Mô tả</label>
            <div className="w-[450px]">
              <TextAreaField
                error={!!errors.description}
                name="description"
                label=""
                placeholder="Nhập nội dung đánh giá ..."
                defaultValue=""
                control={control}
                className="w-full"
                rows={5}
              />
              <p className="mt-1"> {errors?.description && (
                <Error message={errors?.description?.message as string}/>
              )}</p>
            </div>
          </div>
          <div className="w-full">
            <label className="text-[#333] font-semibold">Loại dịch vụ</label>
            <SelectField
              name="serviceId"
              label=""
              labelDisplay=""
              control={control}
              options={serviceOption}
              className="h-[52px] w-[450px]"
              inputProps={{
                className: "border-0 h-[52px] px-4 py-0 !h-full !flex !items-center",
                maxLength: 256,
              }}
              error={!!errors?.serviceId}

            />
            <p className="mt-1"> {errors?.serviceId && (
              <Error message={errors?.serviceId?.message as string}/>
            )}</p>
          </div>
          <ButtonBtn
            width={150}
            bg="var(--clr-blue-400)"
            type="submit"
            startIcon={isLoading && <LoadingButton/>}
          >
            <span className="font-semibold whitespace-nowrap">Thêm mới</span>
          </ButtonBtn>

        </div>
      </div>

      {/*page add dish*/}
      <div className="w-3/5 pl-4">
        <SearchInFilter
          onSearch={handleSearch}
          isResetAll={true}
          width="450px"
        />
        <div className="overflow-auto sticky w-full">
          {groupDishesByType(menuItems).length > 0 &&
            groupDishesByType(menuItems)?.map((dish: any, index) => (
              <div key={index} className="w-full">
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
                    className="flex items-center gap-3 py-4 px-4 cursor-pointer hover:bg-gray-100 w-full"
                  >
                    <Avatar
                      alt="Image food"
                      src={
                        menu.image ||
                        "https://lavenderstudio.com.vn/wp-content/uploads/2017/03/chup-san-pham.jpg"
                      }
                      sx={{ width: 60, height: 60 }}
                    />
                    <div className="flex items-center w-full flex-1">
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
                        <div className="flex items-center">
                          <input
                            className="ml-2 w-[20px] px-2 py-1 border border-gray-300 rounded-lg"
                            style={{ height: "32px" }}
                            type="checkbox"
                            onChange={(e) => {
                              handleToggleDish(menu.id, e.target.checked ? 1 : 0);
                            }}
                            checked={!!checkedDishes[menu.id]}
                          />
                          <span className="px-4 text-[--clr-gray-500]">Số lượng</span>
                          <input
                            type="number"
                            value={checkedDishes[menu.id]}
                            onChange={(e) => handleToggleDish(menu.id, parseInt(e.target.value))}
                            min={0}
                            className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded"
                          />
                        </div>
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